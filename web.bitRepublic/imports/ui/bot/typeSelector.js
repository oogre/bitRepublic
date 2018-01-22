import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import BotSelector from './selector.js';

class BotTypeSelector extends Component {
	constructor(props){
		super(props);
	}
	handleBotSelected(input){
		this.props.onBotSelected(input);
	}
	renderBots(){
		return this.props.bots.map((bot) => (
			<BotSelector key={bot.target} bot={bot} onSelected={this.handleBotSelected.bind(this)}/>
		));
	}
	render() {
		return (
			<div className="container">
				- What job will the taxt bot do - 
				<ul>
					{this.renderBots()}
				</ul>
			</div>
		);
  	}
}

export default withTracker(() => {
	return {
		bots : [
			{
				title : "be aware",
				will : "Send your claim to the Prime Minister",
				picture : "IMG",
				counter : "type",
				target : "politics",
				action : "Send a tweet postcard to the Prime Minister",
				tweets : [
					"tweetA1",
					"tweetB1",
					"tweetC1",
				]
			},
			{
				title : "Claim a bitsoiltax",
				will : "Time to GAFAM to pay",
				picture : "IMG",
				counter : "type",
				target : "ceos",
				action : "Send a tweet postcard to the CEO's of the top ten netgiants",
				tweets : [
					"tweetA2",
					"tweetB2",
					"tweetC2",
				]
			},
			{
				title : "Join the bitsoil campain",
				will : "Invite your friends",
				picture : "IMG",
				counter : "type",
				target : "friends",
				action : "Send a tweet postcard to all your friends",
				tweets : [
					"tweetA3",
					"tweetB3",
					"tweetC3",
				]
			}
		]
	};
})(BotTypeSelector);