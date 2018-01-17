import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';



class UserLogOut extends Component {
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

export default withTracker(() => {
	return {
		userId : Meteor.userId(),
		currentUser : Meteor.user()
	};
})(UserLogOut);
