import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import AccountsUIWrapper from '../AccountsUIWrapper.js';

import UserLogInOut from '../user/loginout.js';
import UserSignup from '../user/signup.js';

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
						<UserLogInOut />
					</li>
					<li>
						<UserSignup />
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
})(MainMenu);