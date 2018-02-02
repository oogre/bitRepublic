/*----------------------------------------*\
  bitRepublic - info.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 15:30:54
  @Last Modified time: 2018-02-02 00:07:50
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
			<li className="table-list__item" key={action._id}>
				{action.content}
			</li>
		));
	}
	renderActive(actions){
		return _.compact(actions).map((action) => (
			<li className="table-list__item" key={action._id}>
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
			<li className="table-list__item" key={action._id}>
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
			<li className="table-list__item" key={action._id}>
				<BitsoilCounter type="simple" currencyBefore={true} bitsoil={bot.bitsoil} tax={false} />
				<span className="table__cell--counter__label">every {moment.duration(action.interval, "second").humanize()}</span>
			</li>
		));

	}
	renderBot(bot){
		return (
			<tr className="table__row" key={bot._id}>
				<td className="table__cell">Picture</td>
				<td className="table__cell nowrap">{bot.model.description}</td>
				<td className="table__cell">{ moment(bot.createdAt.getTime()).format('MM-DD-YYYY') }</td>
				<td className="table__cell nowrap">
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
				<td className="table__cell text-right" colSpan="6">total bitsoils</td>
				<td className="table__cell text-center">
					<BitsoilCounter type="simple" currencyBefore={true} bitsoil={this.props.totalBitsoil} tax={false} />
					<span className="table__cell--counter__label">every {this.props.totalInterval.humanize()}</span>
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
						<th className="table__header__cell">Created at</th>
						<th className="table__header__cell">Next action at</th>
						<th className="table__header__cell">Active</th>
						<th className="table__header__cell">Tweet</th>
						<th className="table__header__cell">Bitsoils</th>
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
