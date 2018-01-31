import React, { Component } from 'react';
//import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import TweetOption from './option.js';
import TweetForm from './form.js';
import { Bitsoils } from '../../api/bitsoils/bitsoils.js';
import { Bots } from '../../api/bots/bots.js';

import { BitsoilCreate } from '../../api/bitsoils/methods.js';
import { BotTweetDelete } from '../../api/bots/methods.js';
import { config } from '../../startup/config.js';
import MessageError from '../message/error.js';

class TweetSelector extends Component {
	constructor(props){
		super(props);
		this.state = {
			'error-login' : false,
			'error-admin' : false,
			'error-bot-model' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false,
			selectedTweet : 0,

		};
		
	}
	handleTweetSelected(k){
		if(this.state.selectedTweet == k) return;
		this.setState({ selectedTweet: k});
		BitsoilCreate.call({bitsoil : config.BITSOIL_UNIT.MIN});
	}
	handleScheduleChange(event){
		event.bot = this.props.bot._id;
		this.props.onTweetSelectorScheduleChange(event);
	}
	handleTweetForm(){
		this.setState({ selectedTweet: -1});
	}
	handleTweetDelete(tweetId, event){
		event.preventDefault();
		this.setState({
			'error-login' : false,
			'error-admin' : false,
			'error-bot-model' : false,
			'is-loading' : true,
			'has-error' : false,
			'has-success' : false
		});

		let data = {
			botId : this.props.bot._id,
			tweetId : tweetId
		}
		
		BotTweetDelete.call(data, (err, res)=>{
			this.setState({'is-loading' : false});
			if (err && err.error === 'validation-error') {
				this.setState({'has-error' : true});
				err.details.forEach((fieldError) => {
					this.setState({
						["error-"+fieldError.name] : fieldError.type
					});
				});
				return;
			}
			this.setState({'has-success' : true});
		});

		
		return false;
	}
	renderTweetButtons(){
		return this.props.bot.tweets.map((tweet, k) => (
			<li className="tabs-selector-list__item" key={k}>
				<button
					className={'tabs-selector-list__button' + (this.state.selectedTweet == k ? ' selected' : '')}
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
				k={this.props.k}
				visible={this.state.selectedTweet == k}
				key={this.props.bot._id+"_"+k}
				id={this.props.bot._id+"_"+k}
				tweet={this.props.bot.tweets[k]}
				onScheduleChange={this.handleScheduleChange.bind(this)}
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
			<div id="tweetSelector" className={"tweets-selector" + " " + (this.props.visible ? "" : "hidden")}>
				<div className="tweets-selector__content">
					<ul className="tabs-selector-list">
						{this.renderTweetButtons()}
						{this.props.isAdmin ? this.renderAddTweet():null}
					</ul>
					{this.renderTweets()}
					{
						(this.props.isAdmin && this.state.selectedTweet == -1) ?
							<TweetForm
								botId={this.props.bot._id}
								visible={this.state.selectedTweet == -1}
							/>
						:
							null
					}
					{	
						this.state["error-login"] ? 
							<MessageError 
								error={this.state["error-login"]} 
								messages={config.FORM.ERRORS.login}
							/>
						:
							null
					}
					
					{	
						this.state["error-admin"] ? 
							<MessageError 
								error={this.state["error-admin"]} 
								messages={config.FORM.ERRORS.admin}
							/>
						:
							null
					}
					
					{	
						this.state["error-bot-model"] ? 
							<MessageError 
								error={this.state["error-bot-model"]} 
								messages={config.FORM.ERRORS.bot-model}
							/>
						:
							null
					}
				</div>
			</div>
		);
	}
}

export default withTracker(() => {
	return {
		isAdmin : Meteor.user() && Meteor.user().roles.includes("admin")
	};
})(TweetSelector);
