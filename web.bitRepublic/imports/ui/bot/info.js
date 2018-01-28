import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';

import * as Utilities from '../../utilities.js'
import {config} from '../../startup/config.js';
import { Bots } from '../../api/bots/bots.js';
import { Actions } from '../../api/actions/actions.js';
import  BitsoilCounter from '../bitsoil/counter.js';

// App component - represents the whole app
class BotInfo extends Component {
	constructor(props){
		super(props);
	}
	handleActiveChange(action){
		Meteor.call("actions.toggle", action._id, !action.active);
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
					).format('lll')
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
				<td>{ moment(bot.createdAt.getTime()).format('lll') }</td>
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
	render() {
		return (
			<div className="container">
				<h4>bot info</h4>
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
			</div>
		);
  	}
}

export default withTracker(() => {
	let bots = Bots.find({
		owner : Meteor.userId(),
		model : {
			$ne : true
		}
	}).fetch();

	let models = Bots.find({
		_id : {
			$in : _.pluck(bots, 'model')
		}
	}).fetch();

	let actions = Actions.find({
		bot : {
			$in : _.pluck(bots, '_id')
		}
	}).fetch();
	
	let totalBitsoil = 0;
	let totalInterval = moment.duration(config.BOT_INFO_TOTAL_INTERVAL, "second");

	for(let i = 0 ; i < bots.length ; i++){
		bots[i].model = _.findWhere(models, { _id : bots[i].model });
		bots[i].actions = bots[i].actions.map(function(act){
						let action = _.findWhere(actions, { _id : act});
						if(action && action.active){
							totalBitsoil += bots[i].bitsoil * (totalInterval.asSeconds() / action.interval) ;
						}
						return action;
					});
	}




	return {
		bots : bots,
		totalBitsoil : totalBitsoil,
		totalInterval : totalInterval
	};
})(BotInfo);
