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
			<header className="main-header">
				<div className="container">
					<h1 className="logo logo--header">
						<a href="/">
							<img src="/images/logo.png" alt="#Bitsoil Tax"/>
						</a>
					</h1>
					<MainMenu />
				</div>
			</header>
		);
		}
}

export default withTracker(() => {

	return {
		userId : Meteor.userId(),
		currentUser : Meteor.user()
	};
})(HeaderMenu);