import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';

import * as Utilities from '../../utilities.js'
import { Bots } from '../../api/bots/bots.js';
import { Actions } from '../../api/actions/actions.js';

// App component - represents the whole app
class BotInfo extends Component {
	constructor(props){
		super(props);
	}
	handleActiveChange(actionId){
		console.log(actionId);
	}
	renderTweet(actions){
		return actions.map((action) => (
			<li key={action._id}>
				{action.content}
			</li>
		));
	}
	renderActive(actions){
		return actions.map((action) => (
			<li key={action._id}>
				<input 
					type="checkbox"
					readOnly
					defaultChecked={action.active}
					onChange={this.handleActiveChange.bind(this, action._id)}
				/>
			</li>
		));
	}
	renderNextActionAt(actions){
		return actions.map((action) => (
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
				<td>{bot.bitsoil}</td>
			</tr>
		);
	}
	renderBots(){
		return this.props.bots.map((bot) => (
			this.renderBot(bot)
		));
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
			
	for(let i = 0 ; i < bots.length ; i++){
		bots[i].model = _.findWhere(models, { _id : bots[i].model });
		bots[i].actions = bots[i].actions.map(function(act){
						return _.findWhere(actions, { _id : act});
					});
	}

	return {
		bots : bots
	};
})(BotInfo);
