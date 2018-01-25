import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import HeaderMenu from './menu/header.js';
import FooterMenu from './menu/footer.js';
import SliderMenu from './menu/slider.js';
import BotSelector from './bot/selector.js';

import BitsoilTotalCounter from './bitsoil/totalCounter.js';


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
				<BitsoilTotalCounter />
				<BotSelector />
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