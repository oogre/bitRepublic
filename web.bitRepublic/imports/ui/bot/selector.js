/*----------------------------------------*\
  bitRepublic - selector.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-02 00:09:00
  @Last Modified time: 2018-02-20 12:56:51
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import * as Utilities from '../../utilities.js'
import { config } from '../../startup/config.js';

import { BitsoilCreate } from '../../api/bitsoils/methods.js';
import { TempWallets } from '../../api/wallets/wallets.js';
import { Schedules } from '../../api/bots/bots.js';
import { CreateBot } from '../../api/bots/methods.js';
import { Bots } from '../../api/bots/bots.js';

import BitsoilCounter from '../bitsoil/counter.js';
import TweetSelector from '../tweet/selector.js';
import BotOption from './option.js';
import UserModal from '../user/modal.js';
import FixeWait from '../fixe/wait.js';

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
				alert("Thank You. I will do the job...");
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
		return (
			<ul className="cards-list">
			{
				this.props.bots.map((bot) => (
					<BotOption
						bitsoil={this.props.bitsoil}
						key={bot._id}
						bot={bot}
						onSelected={this.handleBotSelected.bind(this)}
					/>
				))
			}
			</ul>
		);
	}
	renderTweets(){
		return this.props.bots.map((bot, k) => (
			<TweetSelector
				k={k}
				onTweetSelectorScheduleChange={this.handleTweetSelectorScheduleChange.bind(this)}
				visible={this.state.selectedBot && this.state.selectedBot._id == bot._id}
				key={"tweet_"+bot._id}
				bot={bot}
			/>
		));
	}
	render() {
		return (
			<div id="taxbot" className="bot-selector clearfix">
				<h2 className="title--primary">Design your tax collector bot</h2>
				<div className="bot-selector__counter">
					<BitsoilCounter unBlock="." large={true} bitsoil={this.props.bitsoil} tax={true} />
				</div>
				<h3 className="title--secondary">Claim a bitsoiltax</h3>
				<div className="container">
					<h4 className="title--ternary">What job will the tax bot do</h4>
					{ this.props.isReady ? this.renderBots() : <FixeWait/> }
				</div>
				<div id="tweetSelector" ></div>
				{ this.props.isReady ? this.renderTweets() : null }
				<div className={"container bot-selector__submit" + (this.state.selectedBot ? "" : " hidden")}>
					<button className="button--primary button--submit"
						disabled={this.state.validateDisable}
						onClick={this.handleValidation.bind(this)}>
							activate me
					</button>
				</div>
				<UserModal
					process="signup"
					onMounted={this.handleModalMounted.bind(this)}
					title="Thank you. I will do the job. I will send the tweet postcards for you. Please fill in the form if you will stay updated about the results."
				/>
			</div>
		);
	}
}

export default withTracker(() => {
	let publicBotsReady = FlowRouter.subsReady("public.bots");
	let scheduleReady = FlowRouter.subsReady("schedules");

	return {
		userId : Meteor.userId(),
		isReady : publicBotsReady && scheduleReady,
		scheduleNeverId : scheduleReady ? Schedules.findOne({value : 0})._id : 0,
		bitsoil : TempWallets.findOne({type : config.WALLET_TYPE.BOT}, {fields : {bitsoil : 1}}).bitsoil,
		bots : publicBotsReady ? Bots.find( {model : true} ).fetch() : []
	};
})(BotSelector);
