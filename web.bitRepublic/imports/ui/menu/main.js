import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import UserLogInModal from '../user/loginModal.js';

class MainMenu extends Component {
	constructor(props){
		super(props);
	}
	render() {
	    return (
			<div className="container">
				<ul>
					<li>
						<a href="/about">About</a>
					</li>
					<li>
						<a href="#">Design your taxbot</a>
					</li>
					<li>
						<a href="/redistribution">Take part of the redistribution</a>
					</li>
					<li>
						<a href="/installation">Installation</a>
					</li>
					<li>
						<a href="#">WHO WE ARE</a>
					</li>
					<li>
						{
						this.props.userId ? 
							<a href={FlowRouter.path("userProfile", {username : this.props.username})}>{this.props.username}</a>
						:
							<UserLogInModal />
						}
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
})(MainMenu);