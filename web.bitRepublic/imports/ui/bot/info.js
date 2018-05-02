/*----------------------------------------*\
  bitRepublic - info.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 15:30:54
  @Last Modified time: 2018-05-02 19:42:32
\*----------------------------------------*/
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
			'error' : false,
			'error-login' : false,
			'error-action' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false
		};
	}
	handleActiveChange(action){
		this.setState({
			'error' : false,
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
			if(err){
				this.setState({'has-error' : true});
				this.setState({
					["error"] : err.message
				});
				return;
			}
		});
	}
	renderTweet(actions){
		return _.compact(actions).map((action) => (
			<li className="table-list__item" key={action._id}>
				{ action.content.replace(/@Friend|@NetGiants|@PrimeMinister/, action.target.join(", ")) }
			</li>
		));
	}
	renderActive(actions){
		return _.compact(actions).map((action) => (
			<li className="table-list__item checkbox" key={action._id}>
				<input
					id={"action_" + action._id}
					type="checkbox"
					readOnly
					checked={action.active}
					onChange={this.handleActiveChange.bind(this, action)}
					className="checkbox--toggle"
				/>
				<label htmlFor={"action_" + action._id} className=""></label>
			</li>
		));
	}
	renderHistoric(histories){
		return _.compact(histories).map((history, k) => (
			<li
				className="table-list__item"
				key={k}
			>
				<a 
					target="_blank" 
					href={"https://twitter.com/"+history.botName+"/status/"+history.tweetId}
				>
					{
						history.createdAt ? 
							moment(history.createdAt).format('MM-DD-YY HH:mm')
						:
							"-"
					}
				</a>
			</li>
		));
	}
	renderHistory(actions){
		return _.compact(actions).map((action) => (
			<li
				className="table-list__item"
				key={action._id}
			>
				<ul className="table-list">
					{ this.renderHistoric(action.history) }
				</ul>
			</li>
		));
	}
	renderNextActionAt(actions){
		return _.compact(actions).map((action) => (
			<li
				className="table-list__item"
				key={action._id}
				style={{
					textDecoration: action.active ? "none":"line-through"
				}}
			>
				{
					moment(action.nextActivation).format('MM-DD-YY HH:mm')
				}
			</li>
		));
	}
	renderBitsoil(bot){

		return _.compact(bot.actions).map((action) => (
			<li className="table-list__item" key={action._id}>
				<BitsoilCounter type="simple" currencyBefore={true} bitsoil={bot.bitsoil} tax={false} />
				<div className="table__cell--counter__label text-right">every {moment.duration(action.interval, "second").humanize().replace(/an |a /, " ")}</div>
			</li>
		));

	}
	renderBot(bot){
		return (
			<tr className="table__row" key={bot._id}>
				<td className="table__cell">
					<img width="100px" src={bot.model.picture} alt={"Bot " + bot.model.target}/>
				</td>
				<td className="table__cell">{bot.model.description}</td>
				<td className="table__cell nowrap text-center">{ moment(bot.createdAt.getTime()).format('MM-DD-YYYY') }</td>
				<td className="table__cell nowrap text-center">
					<ul className="table-list">
						{ this.renderNextActionAt(bot.actions) }
					</ul>
				</td>
				<td className="table__cell">
					<ul className="table-list">
						{ this.renderActive(bot.actions) }
					</ul>
				</td>
				<td className="table__cell">
					<ul className="table-list">
						{ this.renderHistory(bot.actions) }
					</ul>
				</td>
				<td className="table__cell">
					<ul className="table-list">
						{ this.renderTweet(bot.actions) }
					</ul>
				</td>
				<td className="table__cell nowrap">
					<ul className="table-list">
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
			<tr className="table__row table__row--totals">
				<td className="table__cell text-right" colSpan="7">Your bots contribution</td>
				<td className="table__cell text-center">
					<BitsoilCounter type="simple" currencyBefore={true} bitsoil={this.props.totalBitsoil} tax={false} />
				</td>
			</tr>
		);
	}
	renderTable(){
		return (
			<table className="table table--zebra table--bots">
				<thead className="table__header">
					<tr>
						<th className="table__header__cell">Bots</th>
						<th className="table__header__cell">Actions</th>
						<th className="table__header__cell table__header__cell--large">Created at</th>
						<th className="table__header__cell table__header__cell--large">Next action at</th>
						<th className="table__header__cell">Active</th>
						<th className="table__header__cell">History</th>
						<th className="table__header__cell">Tweet</th>
						<th className="table__header__cell table__header__cell--xl">Bitsoils</th>
					</tr>
				</thead>
				<tbody className="table__body">
					{this.renderBots()}
					{this.renderTotal()}
				</tbody>
			</table>
		);
	}
	render() {
		return (
			<div className="container">
				<section className="section--profile">
					<h2 className="title--profile">Bot info</h2>
						<div className="section__content">
							{ this.props.isReady ? this.renderTable() : <FixeWait/> }
							{ this.state["error-login"] ? <MessageError error={ this.state["error-login"] } messages={ config.FORM.ERRORS.login } /> : null }
							{ this.state["error-action"] ? <MessageError error={ this.state["error-action"] } messages={ config.FORM.ERRORS.action } /> : null }
							{ this.state["error"] ? <MessageError error={this.state["error"]} messages={[]} /> : null }
						</div>
				</section>
			</div>
		);
	}
}

export default withTracker(() => {
	let myBotsReady = FlowRouter.subsReady("my.bots");
	let bots = [];
	let totalBitsoil = 0;
	
	if(myBotsReady){
		bots = Bots.find({owner : Meteor.userId(), model : { $ne : true }}).fetch();
		let models = Bots.find({_id : {$in : _.pluck(bots, 'model')}}).fetch();
		let actions = Actions.find({bot : {$in : _.pluck(bots, '_id')}}).fetch();
		for(let i = 0 ; i < bots.length ; i++){
			bots[i].model = _.findWhere(models, { _id : bots[i].model });
			bots[i].actions = 	bots[i].actions.map(function(act){
									let action = _.findWhere(actions, { _id : act});
									if(action){
										totalBitsoil += bots[i].bitsoil * action.counter;
									}
									return action;
								});
		}
	}

	return {
		isReady : myBotsReady,
		bots : bots,
		totalBitsoil : totalBitsoil
	};
})(BotInfo);
