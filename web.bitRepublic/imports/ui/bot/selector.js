import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import BotOption from './option.js';
import TweetSelector from '../tweet/selector.js';
import UserSignupModal from '../user/signupModal.js';
import { TempWallets } from '../../api/wallets/wallets.js';
import {config} from '../../startup/config.js';

import { Bots } from '../../api/bots/bots.js';
import { Bitsoils } from '../../api/bitsoils/bitsoils.js';

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
		if(this.state.selectedBot == bot._id) return;
		this.setState({
			selectedBot : bot._id
		});
		Meteor.call("bitsoils.generate", 0.000001);
	}
	handleValidation(){
		if(!this.state.validateDisable){
			this.state.signupModal.handleOpenModal();
			console.log(this.state.validateBotData);
			Meteor.call("bitsoils.generate", 0.000001);
		}
	}
	handleModalMounted(signupModal){
		this.setState({ signupModal: signupModal});
	}

	handleTweetSelectorScheduleChange(event){
		let botData = this.state.tempBotData;
		botData[event.bot] = botData[event.bot] || {};
		if(event.schedule == "never"){
			delete botData[event.bot][event.tweet];
			if(_.isEmpty(botData[event.bot])){
				delete botData[event.bot];
			}
		}else{
			botData[event.bot][event.tweet] = event.schedule	
		}
		this.setState({
			tempBotData : botData,
			validateDisable : _.isEmpty(botData) || _.isEmpty(botData[this.state.selectedBot]),
			validateBotData : {
				botId : this.state.selectedBot,
				tweet : _.chain(botData[this.state.selectedBot]).map(function(v, k){
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
				visible={this.state.selectedBot == bot._id}
				key={"tweet_"+bot._id} 
				bot={bot} 
			/>
		));
	}
	render() {
		return (
			<div className="container">
				- What job will the taxt bot do - 
				<ul>
					{this.renderBots()}
				</ul>
				{this.renderTweets()}
				<button 
					disabled={this.state.validateDisable} 
					onClick={this.handleValidation.bind(this)}>
						validate
				</button>
				<UserSignupModal 
					botData={this.state.botData} 
					onMounted={this.handleModalMounted.bind(this)}
				/>
			</div>
		);
  	}
}

export default withTracker(() => {
	let wallet = TempWallets.findOne({
		type : config.WALLET_TYPE.BOT,
	});
	if(!wallet){
		let walletId = TempWallets.insert({
			createdAt : new Date(),
			type : config.WALLET_TYPE.BOT,
			bitsoil : 0
		});
		wallet = TempWallets.findOne({_id : walletId});
	}
	return {
		wallet : wallet,
		bots : Bots.find({
			model : true
		}).fetch()
	};
})(BotSelector);