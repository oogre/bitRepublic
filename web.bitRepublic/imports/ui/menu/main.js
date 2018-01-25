import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import AccountsUIWrapper from '../AccountsUIWrapper.js';

import UserLogInOut from '../user/loginout.js';
import UserLogInModal from '../user/loginModal.js';

class MainMenu extends Component {
	constructor(props){
		super(props);
	}

	handleLogout(event){
		event.preventDefault();
		Meteor.logout();
	}

	render() {
			return (
			<nav>
				<ul className="menu menu--header">
					<li className="menu__item">
						<a className="menu__item__link" href="/about">About</a>
					</li>
					<li className="menu__item">
						<a className="menu__item__link" href="#">Design your taxbot</a>
					</li>
					<li className="menu__item">
						<a className="menu__item__link" href="/redistribution">Take part of the redistribution</a>
					</li>
					<li className="menu__item">
						<a className="menu__item__link" href="/installation">Installation</a>
					</li>
					<li className="menu__item">
						<a className="menu__item__link" href="#">WHO WE ARE</a>
					</li>
					<li className="menu__item">
						{
						this.props.userId ?
							<a className="menu__item__link" href={FlowRouter.path("userProfile", {username : this.props.username})}>{this.props.username}</a>
						:
							<UserLogInModal />
						}
					</li>
					<li className="menu__item">
						<UserLogInOut />
					</li>
				</ul>
			</nav>
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