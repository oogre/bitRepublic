import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import HeaderMenu from './menu/header.js';
import FooterMenu from './menu/footer.js';
import SliderMenu from './menu/slider.js';
import BotDisplayer from './bot/display.js';
import BitSoilsCounter from './bitsoil/counter.js';

// App component - represents the whole app
class App extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<div className="container">
				<HeaderMenu />
				<SliderMenu />
				<BitSoilsCounter sentence="There are [X] bitsoils"/>
				<BotDisplayer sentence="You have created [X] bitsoils" userId={this.props.userId}/>

				<ul>
					<li>
						<BotDisplayer sentence="You have created [X] bitsoils" userId={this.props.userId}/>
					</li>
					<li>
						<BotDisplayer sentence="You have created [X] bitsoils" userId={this.props.userId}/>
					</li>
					<li>
						<BotDisplayer sentence="You have created [X] bitsoils" userId={this.props.userId}/>
					</li>
				</ul>

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