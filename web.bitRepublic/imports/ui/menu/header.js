import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import MainMenu from './main.js';

// App component - represents the whole app
class HeaderMenu extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
	    return (
			<div className="container">
				<header>
					<h1>
						<a href="/">
							<span>#BITSOIL</span>
							<span>TAX</span>
						</a>
					</h1>
					<MainMenu />
				</header>
			</div>
		);
  	}
}

export default withTracker(() => {
	
	return {
		userId : Meteor.userId(),
		currentUser : Meteor.user()
	};
})(HeaderMenu);