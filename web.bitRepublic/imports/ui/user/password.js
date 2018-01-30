import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { config } from '../../startup/config.js';
import { Users } from '../../api/users/users.js';

// App component - represents the whole app
export default class UserPassword extends Component {
	constructor(props){
		super(props);
	}
	
	handleResetPassword(e){
		Meteor.call("users.resetPassord");
	}
	render() {
		//<HeaderMenu />
		return (
			<div className="container">
				<label>
					Send me a mail to 
					<button onClick={this.handleResetPassword.bind(this)}>
						Reset Password
					</button>
				</label>
			</div>
		);
  	}
}