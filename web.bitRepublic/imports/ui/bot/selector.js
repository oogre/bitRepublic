import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import BotOption from './option.js';
import TweetSelector from '../tweet/selector.js';
import UserSignupModal from '../user/signupModal.js';

import { Bots } from '../../api/bots/bots.js';

class BotSelector extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			selectedBot : 0,
			signupModal : 0,
			validateActive : false,
			botData : {}
		}
		
	}
	handleBotSelected(bot){
		this.setState({
			selectedBot : bot._id
		});
	}
	handleValidation(){
		if(this.state.validateActive){
			this.state.signupModal.handleOpenModal();
		}
	}
	handleModalMounted(signupModal){
		this.setState({ signupModal: signupModal});
	}

	handleTweetSelectorScheduleChange(event){
		let botData = this.state.botData;
		botData[event.bot] = botData[event.bot] || {};
		if(event.schedule == "never"){
			delete botData[event.bot][event.tweet];
			if(Object.keys(botData[event.bot]).length === 0){
				delete botData[event.bot];
			}
		}else{
			botData[event.bot][event.tweet] = event.schedule	
		}

		this.setState({
			botData : botData,
			validateActive : Object.keys(botData).length !== 0
		});		
	}
	renderBots(){
		return this.props.bots.map((bot) => (
			<BotOption 
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
					disabled={!this.state.validateActive} 
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
	return {
		bots : Bots.find({
			model : true
		}).fetch()
	};
})(BotSelector);