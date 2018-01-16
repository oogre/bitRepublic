import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import MainMenu from './main.js';

// App component - represents the whole app
class FooterMenu extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
	    return (
			<div className="container">
				<ul>
					<li>
						<a href="/contact">Contact</a>
					</li>
					<li>
						<a href="#">Supported by</a>
					</li>
					<li>
						<a href="#">Partners</a>
					</li>
					<li>
						<a href="#">Copyright</a>
					</li>
				</ul>
			</div>
		);
  	}
}

export default withTracker(() => {
	
	return {
		userId : Meteor.userId(),
		currentUser : Meteor.user()
	};
})(FooterMenu);