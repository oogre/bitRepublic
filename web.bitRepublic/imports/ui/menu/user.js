import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import UserLogOut from '../user/logout.js';

class UserMenu extends Component {
	constructor(props){
		super(props);
	}
	render() {
	    return (
			<div className="container">
				<ul>
					<li>
						<a href={FlowRouter.path("userProfile", {username : this.props.username})}>Bot info</a>
					</li>
					<li>
						<a href={FlowRouter.path("userUpdate", {username : this.props.username})}>Update profile</a>
					</li>
					<li>
						<UserLogOut/>
					</li>
				</ul>
			</div>
		);
  	}
}

export default withTracker(() => {
	let currentUser = Meteor.user();
	let username = currentUser ? currentUser.username : null;
	let userId = currentUser ? currentUser._id : null;
	return {
		userId : userId,
		currentUser : currentUser,
		username : username
	};
})(UserMenu);