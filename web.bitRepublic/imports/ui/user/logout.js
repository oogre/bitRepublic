/*----------------------------------------*\
  bitRepublic - logout.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-27 02:43:46
  @Last Modified time: 2018-02-02 00:08:26
\*----------------------------------------*/
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