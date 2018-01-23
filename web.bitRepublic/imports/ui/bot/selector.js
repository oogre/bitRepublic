import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import BotOption from './option.js';
import { Bots } from '../../api/bots/bots.js';
class BotSelector extends Component {
	constructor(props){
		super(props);
	}
	handleBotSelected(bot){
		this.props.onBotSelected(bot);
	}
	renderBots(){
		return this.props.bots.map((bot) => (
			<BotOption key={bot._id} bot={bot} onSelected={this.handleBotSelected.bind(this)}/>
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
		bots : Bots.find({
			model : true
		}).fetch()
	};
})(BotSelector);