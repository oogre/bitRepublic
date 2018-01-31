import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import {config} from '../../startup/config.js';

import { TempWallets } from '../../api/wallets/wallets.js';
import { Schedules } from '../../api/bots/bots.js';
import { Bots } from '../../api/bots/bots.js';

import { CreateBot } from '../../api/bots/methods.js';

import BotOption from './option.js';
import TweetSelector from '../tweet/selector.js';
import UserModal from '../user/modal.js';
import BitsoilCounter from '../bitsoil/counter.js';
import { BitsoilCreate } from '../../api/bitsoils/methods.js';

import * as Utilities from '../../utilities.js'
class BotSelector extends Component {
	constructor(props){
		super(props);

		this.state = {
			selectedBot : 0,
			modal : 0,
			validateDisable : true,
			tempBotData : {},
			validateBotData : {},
			'is-loading' : true,
			'has-error' : false,
			'has-success' : false
		}

	}
	handleBotSelected(bot){
		if(this.state.selectedBot && this.state.selectedBot._id == bot._id) return;
		this.setState({
			selectedBot : bot
		});
		BitsoilCreate.call({bitsoil : config.BITSOIL_UNIT.MIN});

		Utilities.scrollTo("tweetSelector");
	}

	handleBotCreation(userId){
		userId = userId || this.props.userId;
		if(!userId && this.state.selectedBot.signup)return;

		const data = {
			userId: userId,
			'bitsoil': this.state.validateBotData.bitsoil,
			'botModelId': this.state.validateBotData.botId,
			'tweet': this.state.validateBotData.tweet
		}
		CreateBot.call(data, (err, res)=>{
			this.setState({'is-loading' : false});
			if (err && err.error === 'validation-error') {
				this.setState({'has-error' : true});
				return;
			}
			this.setState({'has-success' : true});
			if(Meteor.user()){
				FlowRouter.go("userProfile", {username : Meteor.user().username})
			}
		});
	}

	handleValidation(){
		if(!this.state.validateDisable){
			BitsoilCreate.call({bitsoil : config.BITSOIL_UNIT.MIN});
			if(this.props.userId){
				this.handleBotCreation(this.props.userId);
			}else{
				this.state.modal.onClose(this.handleBotCreation.bind(this));
				this.state.modal.handleOpenModal();
			}
		}
	}

	handleModalMounted(modal){
		this.setState({ modal: modal});
	}

	handleTweetSelectorScheduleChange(event){
		let botData = this.state.tempBotData;
		botData[event.bot] = botData[event.bot] || {};
		if(event.schedule == this.props.scheduleNeverId){
			delete botData[event.bot][event.tweet];
			if(_.isEmpty(botData[event.bot])){
				delete botData[event.bot];
			}
		}else{
			botData[event.bot][event.tweet] = event.schedule
		}
		this.setState({
			tempBotData : botData,
			validateDisable : _.isEmpty(botData) || _.isEmpty(botData[this.state.selectedBot._id]),
			validateBotData : {
				bitsoil : this.props.bitsoil,
				botId : this.state.selectedBot._id,
				tweet : _.chain(botData[this.state.selectedBot._id]).map(function(v, k){
							return {
								tweetId : k,
								schedule : v
							}
						}).value()
			}
		});
		BitsoilCreate.call({bitsoil : config.BITSOIL_UNIT.MIN});
	}
	renderBots(){
		return this.props.bots.map((bot) => (
			<BotOption
				bitsoil={this.props.bitsoil}
				key={bot._id}
				bot={bot}
				onSelected={this.handleBotSelected.bind(this)}
			/>
		));
	}
	renderTweets(){
		return this.props.bots.map((bot, k) => (
			<TweetSelector
				k={k+1}
				onTweetSelectorScheduleChange={this.handleTweetSelectorScheduleChange.bind(this)}
				visible={this.state.selectedBot && this.state.selectedBot._id == bot._id}
				key={"tweet_"+bot._id}
				bot={bot}
			/>
		));
	}
	render() {
		return (
			<div id="taxbot" className="bot-selector">
				<h2 className="title--primary">Design your tax collector bot</h2>
				<div className="bot-selector__counter">
					<BitsoilCounter unBlock="." large={true} bitsoil={this.props.bitsoil} tax={true} />
				</div>
				<h3 className="title--secondary">Claim a bitsoiltax</h3>
				<div className="container">
					<h4 className="title--ternary">What job will the tax bot do</h4>
					<ul className="cards-list">
						{this.renderBots()}
					</ul>
				</div>
				<div id="tweetSelector" ></div>
				{this.renderTweets()}
				<div className="container">
					<button className="button--primary button--submit"
						disabled={this.state.validateDisable}
						onClick={this.handleValidation.bind(this)}>
							validate
					</button>
					<UserModal
						process="signup"
						onMounted={this.handleModalMounted.bind(this)}
					/>
				</div>

			</div>
		);
	}
}

export default withTracker(() => {
	let scheduleNever = Schedules.findOne({value : 0});
	scheduleNeverId = scheduleNever ? scheduleNever._id : null;
	let wallet = TempWallets.findOne({type : config.WALLET_TYPE.BOT});
	let bitsoil = wallet ? wallet.bitsoil : 0;
	let bots = Bots.find( {model : true} ).fetch() || [];
	return {
		scheduleNeverId : scheduleNeverId,
		userId : Meteor.userId(),
		bitsoil : bitsoil,
		bots : bots
	};
})(BotSelector);
