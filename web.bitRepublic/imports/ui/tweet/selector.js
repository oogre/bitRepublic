import React, { Component } from 'react';
//import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import TweetOption from './option.js';
import TweetForm from './form.js';

class TweetSelector extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedTweet : 0,
		};
	}
	handleTweetSelected(k){
		this.setState({ selectedTweet: k});
	}
	handleTweetSchedule(event){
		event.bot = this.props.bot._id;
		this.props.onTweetSelectorScheduleChange(event);
	}
	handleTweetForm(){
		this.setState({ selectedTweet: -1});
	}
	handleTweetDelete(tweetId, event){
		event.preventDefault();	
		let data = {
			botId : this.props.bot._id,
			tweetId : tweetId
		}
		Meteor.call("bot.tweet.delete", data);
		return false;
	}
	renderTweetButtons(){
		return this.props.bot.tweets.map((tweet, k) => (
			<li key={k}>
				<button 
					className={this.state.selectedTweet == k ? 'selected' : ''} 
					onClick={this.handleTweetSelected.bind(this, k)} 
				>
					tweet #{k}
				</button>
				{
					this.props.isAdmin ? this.renderDeleteTweetButton(tweet._id) : null
				}
			</li>
		));
	}
	renderDeleteTweetButton(tweetID){
		return (
			<a href="#" onClick={this.handleTweetDelete.bind(this, tweetID)}>&times;</a>
		)
	}
	renderTweets(){
		return this.props.bot.tweets.map((tweet, k) => (
			<TweetOption 
				visible={this.state.selectedTweet == k}
				key={this.props.bot._id+"_"+k}
				id={this.props.bot._id+"_"+k} 
				tweet={this.props.bot.tweets[k]}
				onScheduleChange={this.handleTweetSchedule.bind(this)}
			/>
		));
	}
	renderAddTweet(){
		return(
			<li>
				<button className="addTweet" onClick={this.handleTweetForm.bind(this)} >+</button>
			</li>
		);
	}
	render() {
		return (
			<div className={"container"+ " " + (this.props.visible ? "" : "hidden")} >
				<ul>
					{this.renderTweetButtons()}
					{this.props.isAdmin ? this.renderAddTweet():null}
					
				</ul>
				{this.renderTweets()}
				{(this.props.isAdmin && this.state.selectedTweet == -1) ? 
					<TweetForm 
						botId={this.props.bot._id}
						visible={this.state.selectedTweet == -1}/> 
						:
						 null}
			</div>
		);
	}
}

export default withTracker(() => {
	return {
		userId : Meteor.userId(),
		currentUser : Meteor.user(),
		isAdmin : Meteor.user() && Meteor.user().roles.includes("admin")
	};
})(TweetSelector);
