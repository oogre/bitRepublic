import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import UserLogInModal from './loginModal.js';
import UserLogOut from './logout.js';

class UserLogInOut extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div>
				{
					this.props.userId ?
						<UserLogOut />
					:
						<UserLogInModal />
				}
			</div>
		);
  	}
}
export default withTracker(() => {
	return {
		userId : Meteor.userId(),
		currentUser : Meteor.user()
	};
})(UserLogInOut);