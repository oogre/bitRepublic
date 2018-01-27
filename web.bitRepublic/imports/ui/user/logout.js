import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class UserLogOut extends Component {
	constructor(props){
		super(props);
	}
	handleLogout(event){
		event.preventDefault();
		Meteor.logout();
		this.props.onClick();
		FlowRouter.go("home");
		return false;
	}
	render() {
		return (
			<a href="#" onClick={this.handleLogout.bind(this)}>Logout</a>
		);
  	}
}