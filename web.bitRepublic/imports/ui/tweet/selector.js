import React, { Component } from 'react';
//import ReactDom from 'react-dom';
//import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import TweetOption from './option.js';
import TweetSchedule from './schedule.js';
import UserSignupModal from '../user/signupModal.js';

export default class TweetSelector extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedTweet : 0,
			selectedSchedule : "",
			botData : "",
			signupModal : ""
		};
	}

	handleTweetSelected(k){
		this.setState({ selectedTweet: k});
	}
	handleTweetSchedule(schedule){
		this.setState({ selectedSchedule: schedule});
	}
	handleValidation(){
		if(this.state.selectedSchedule != ""){
			//this.props.onValidation(this.state.selectedTweet, this.state.selectedSchedule);
			/*this.setState({ 
				botData: {
					bot : this.props.bot,
					tweet : this.state.selectedTweet,
					schedule : this.state.selectedSchedule
				}
			});*/
			this.state.signupModal.handleOpenModal();
		}
	}
	handleModalMounted(signupModal){
		this.setState({ signupModal: signupModal});
	}
	
	renderTweetButtons(){
		return this.props.bot.tweets.map((tweet, k) => (
			<li key={k}>
				<button className={this.state.selectedTweet == k ? 'selected' : ''} onClick={this.handleTweetSelected.bind(this, k)} >tweet #{k}</button>
			</li>
		));
	}
	render() {
		return (
			<div className="container">
				<ul>
					{this.renderTweetButtons()}
				</ul>
				<TweetOption id={this.state.selectedTweet} tweet={this.props.bot.tweets[this.state.selectedTweet]}/>
				<TweetSchedule onScheduleSelected={this.handleTweetSchedule.bind(this)}/>
				<button disabled={this.state.selectedSchedule == ""} onClick={this.handleValidation.bind(this)}>validate</button>
				<UserSignupModal botData={this.state.botData} onMounted={this.handleModalMounted.bind(this)}/>
			</div>
		);
	}
}
/*
export default withTracker(() => {
	return {
	};
})(TweetSelector);
*/