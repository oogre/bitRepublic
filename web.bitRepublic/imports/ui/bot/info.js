import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';

import * as Utilities from '../../utilities.js'
import {config} from '../../startup/config.js';

import { ToggleAction } from '../../api/actions/methods.js';
import { Actions } from '../../api/actions/actions.js';
import { Bots } from '../../api/bots/bots.js';

import  BitsoilCounter from '../bitsoil/counter.js';
import MessageError from '../message/error.js';
import FixeWait from '../fixe/wait.js';


// App component - represents the whole app
class BotInfo extends Component {
	constructor(props){
		super(props);
		this.state = {
			'error-login' : false,
			'error-action' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false
		};
	}
	handleActiveChange(action){
		this.setState({
			'error-login' : false,
			'error-action' : false,
			'is-loading' : true,
			'has-error' : false,
			'has-success' : false
		});

		const data = {
			actionId : action._id,
			setChecked : !action.active
		};
		ToggleAction.call(data, (err, res)=>{
			if (err && err.error === 'validation-error') {
				this.setState({'has-error' : true});
				err.details.forEach((fieldError) => {
					this.setState({
						["error-"+fieldError.name] : fieldError.type
					});
				});
				return;
			}
			console.log(res);
		});
	}
	renderTweet(actions){
		return _.compact(actions).map((action) => (
			<li key={action._id}>
				{action.content}
			</li>
		));
	}
	renderActive(actions){
		return _.compact(actions).map((action) => (
			<li key={action._id}>
				<input 
					type="checkbox"
					readOnly
					defaultChecked={action.active}
					onChange={this.handleActiveChange.bind(this, action)}
				/>
			</li>
		));
	}
	renderNextActionAt(actions){
		return _.compact(actions).map((action) => (
			<li key={action._id}>
				{ 
					moment(
						Utilities.datePlusSeconds(
							action.nextActivation, action.interval
						).getTime()
					).format('MM-DD-YY HH:mm')
				}
			</li>
		));
	}
	renderBitsoil(bot){
		return _.compact(bot.actions).map((action) => (
			<li key={action._id}>
				<BitsoilCounter currencyBefore={true} bitsoil={bot.bitsoil} tax={false} />
				every {moment.duration(action.interval, "second").humanize()}
			</li>
		));

	}
	renderBot(bot){
		return (
			<tr key={bot._id}>
				<td>Picture</td>
				<td>{bot.model.description}</td> 
				<td>{ moment(bot.createdAt.getTime()).format('MM-DD-YYYY') }</td>
				<td>
					<ul>
						{ this.renderNextActionAt(bot.actions) }
					</ul>
				</td>
				<td>
					<ul>
						{ this.renderActive(bot.actions) }
					</ul>
				</td>
				<td>
					<ul>
						{ this.renderTweet(bot.actions) }
					</ul>
				</td>
				<td>
					<ul>
						{ this.renderBitsoil(bot) }
					</ul>
					
				</td>
			</tr>
		);
	}
	renderBots(){
		return this.props.bots.map((bot) => (
			this.renderBot(bot)
		));
	}
	renderTotal(){
		return (
			<tr>
				<td>total bitsoils</td>
				<td>
					<BitsoilCounter currencyBefore={true} bitsoil={this.props.totalBitsoil} tax={false} /> 
					every {this.props.totalInterval.humanize()}
				</td>
			</tr>
		);
	}
	renderTable(){
		return (
			<table>
				<tbody>
					<tr>
						<th>Bots</th>
						<th>Actions</th> 
						<th>Created at</th>
						<th>Next action at</th>
						<th>Active</th>
						<th>Tweet</th>
						<th>Bitsoils</th>
					</tr>
					{this.renderBots()}
					{this.renderTotal()}
				</tbody>
			</table>
		);
	}
	render() {
		return (
			<div className="container">
				<h4>bot info</h4>
				{ this.props.isReady ? this.renderTable() : <FixeWait/> }
				
				{ this.state["error-login"] ? <MessageError error={ this.state["error-login"] } messages={ config.FORM.ERRORS.login } /> : null }
				{ this.state["error-action"] ? <MessageError error={ this.state["error-action"] } messages={ config.FORM.ERRORS.action } /> : null }
			</div>
		);
  	}
}

export default withTracker(() => {
	let myBotsReady = FlowRouter.subsReady("my.bots");
	let bots = [];
	let totalBitsoil = 0;
	let totalInterval = moment.duration(config.BOT_INFO_TOTAL_INTERVAL, "second");

	if(myBotsReady){
		bots = Bots.find({owner : Meteor.userId(), model : { $ne : true }}).fetch();
		let models = Bots.find({_id : {$in : _.pluck(bots, 'model')}}).fetch();
		let actions = Actions.find({bot : {$in : _.pluck(bots, '_id')}}).fetch();
		for(let i = 0 ; i < bots.length ; i++){
			bots[i].model = _.findWhere(models, { _id : bots[i].model });
			bots[i].actions = 	bots[i].actions.map(function(act){
									let action = _.findWhere(actions, { _id : act});
									if(action && action.active){
										totalBitsoil += bots[i].bitsoil * (totalInterval.asSeconds() / action.interval) ;
									}
									return action;
								});
		}
	}
	
	return {
		isReady : myBotsReady,
		bots : bots,
		totalBitsoil : totalBitsoil,
		totalInterval : totalInterval
	};
})(BotInfo);
