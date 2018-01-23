import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import HeaderMenu from './menu/header.js';
import FooterMenu from './menu/footer.js';
import SliderMenu from './menu/slider.js';
import BotSelector from './bot/selector.js';
import TweetSelector from './tweet/selector.js';
import BitSoilsTotalCounter from './bitsoil/totalCounter.js';
import UserSignup from './user/signup.js';

// App component - represents the whole app
class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedBot : ""
		};
	}
	handleBotSelected(bot){
		this.setState({ selectedBot: bot });
	}
	handleTweetValidation(){
		console.log("validation");
	}
	
	render() {
		return (
			<div className="container">
				<HeaderMenu />
				<SliderMenu />
				<BitSoilsTotalCounter />
				<BotSelector onBotSelected={this.handleBotSelected.bind(this)} />
				{ 
					this.state.selectedBot 
					?
						<TweetSelector bot={this.state.selectedBot} onValidation={this.handleTweetValidation.bind(this)}/>
					:
						""
				}
				<UserSignup />
				<FooterMenu />
			</div>
		);
  	}
}

export default withTracker(() => {
	
	return {
		userId : Meteor.userId(),
		currentUser : Meteor.user()
	};
})(App);