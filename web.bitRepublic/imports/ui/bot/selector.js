import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import {config} from '../../startup/config.js';

import { TempWallets } from '../../api/wallets/wallets.js';
import { Bots } from '../../api/bots/bots.js';
import { Bitsoils } from '../../api/bitsoils/bitsoils.js';

import BotOption from './option.js';
import TweetSelector from '../tweet/selector.js';
import UserSignupModal from '../user/signupModal.js';

class BotSelector extends Component {
	constructor(props){
		super(props);

		this.state = {
			selectedBot : 0,
			signupModal : 0,
			validateDisable : true,
			tempBotData : {},
			validateBotData : {}
		}

	}
	handleBotSelected(bot){
		if(this.state.selectedBot && this.state.selectedBot._id == bot._id) return;
		this.setState({
			selectedBot : bot
		});
		Meteor.call("bitsoils.generate", 0.000001);
	}

	handleBotCreation(data){
		data = data || this.props.userId;
		if(!data && this.state.selectedBot.signup)return;
		Meteor.call('bots.create', data, this.state.validateBotData, (err, res) => {
			if(err){
				console.log(err.reason);
			}else{
				console.log("BotCreated " + res);
			}
		});
	}

	handleValidation(){
		if(!this.state.validateDisable){
			Meteor.call("bitsoils.generate", 0.000001);
			if(this.props.userId){
				this.handleBotCreation(this.props.userId);
			}else{
				this.state.signupModal.onClose(this.handleBotCreation.bind(this));
				this.state.signupModal.handleOpenModal();
			}
		}
	}

	handleModalMounted(signupModal){
		this.setState({ signupModal: signupModal});
	}

	handleTweetSelectorScheduleChange(event){
		let botData = this.state.tempBotData;
		botData[event.bot] = botData[event.bot] || {};
		if(event.schedule == "0"){
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
				bitsoil : this.props.wallet.bitsoil,
				botId : this.state.selectedBot._id,
				tweet : _.chain(botData[this.state.selectedBot._id]).map(function(v, k){
							return {
								tweetId : k,
								schedule : v
							}
						}).value()
			}
		});
		Meteor.call("bitsoils.generate", 0.000001);
	}
	renderBots(){
		return this.props.bots.map((bot) => (
			<BotOption
				wallet={this.props.wallet}
				key={bot._id}
				bot={bot}
				onSelected={this.handleBotSelected.bind(this)}
			/>
		));
	}
	renderTweets(){
		return this.props.bots.map((bot) => (
			<TweetSelector
				onTweetSelectorScheduleChange={this.handleTweetSelectorScheduleChange.bind(this)}
				visible={this.state.selectedBot && this.state.selectedBot._id == bot._id}
				key={"tweet_"+bot._id}
				bot={bot}
			/>
		));
	}
	render() {
		return (
			<div className="bot-selector">
				<h2 className="title--primary">Design your tax collector bot</h2>
				<div className="bot-selector__counter">
					<div className="container">

					</div>
				</div>
				<h3 className="title--secondary">Claim a bitsoiltax</h3>
				<div className="container">
					<h4 className="title--ternary">What job will the tax bot do</h4>
					<ul className="cards-list">
						{this.renderBots()}
					</ul>
					{this.renderTweets()}
					<button className="button--primary button--submit"
						disabled={this.state.validateDisable}
						onClick={this.handleValidation.bind(this)}>
							validate
					</button>
					<UserSignupModal
						botData={this.state.botData}
						onMounted={this.handleModalMounted.bind(this)}
					/>
				</div>
			</div>
		);
	}
}

export default withTracker(() => {
	return {
		userId : Meteor.userId(),
		wallet : TempWallets.findOne({type : config.WALLET_TYPE.BOT}),
		bots : Bots.find( {model : true} ).fetch()
	};
})(BotSelector);
