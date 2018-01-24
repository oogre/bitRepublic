import React, { Component } from 'react';
//import ReactDom from 'react-dom';
//import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import TweetOption from './option.js';

export default class TweetSelector extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedTweet : 0,
			botData : "",
			signupModal : "",
			tweets : []
		};
	}
	handleTweetSelected(k){
		this.setState({ selectedTweet: k});
	}
	handleTweetSchedule(event){
		event.bot = this.props.bot._id;
		this.props.onTweetSelectorScheduleChange(event);
	}


	handleTweetMounted(tweet){
		let tweets = this.state.tweets;
		if(!tweets.includes(tweet)){
			tweets.push(tweet);
			this.setState({ tweets: tweets});
		}
	}
	
	renderTweetButtons(){
		return this.props.bot.tweets.map((tweet, k) => (
			<li key={k}>
				<button className={this.state.selectedTweet == k ? 'selected' : ''} onClick={this.handleTweetSelected.bind(this, k)} >tweet #{k}</button>
			</li>
		));
	}
	renderTweets(){
		return this.props.bot.tweets.map((tweet, k) => (
			<TweetOption 
				visible={this.state.selectedTweet == k}
				key={this.props.bot._id+"_"+k}
				id={this.props.bot._id+"_"+k} 
				onMounted={this.handleTweetMounted.bind(this)} 
				tweet={this.props.bot.tweets[k]}
				onScheduleChange={this.handleTweetSchedule.bind(this)}
			/>
		));
	}
	render() {
		return (
			<div className={"container"+ " " + (this.props.visible ? "" : "hide")} >
				<ul>
					{this.renderTweetButtons()}
				</ul>
				{this.renderTweets()}
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