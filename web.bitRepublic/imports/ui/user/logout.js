import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class UserLogOut extends Component {
	constructor(props){
		super(props);
	}
	handleLogout(event){
		event.preventDefault();
		Meteor.logout();
	}
	render() {
		return (
			<div className="container">
				<a href="#" onClick={this.handleLogout}>Logout</a>
			</div>
		);
  	}
}