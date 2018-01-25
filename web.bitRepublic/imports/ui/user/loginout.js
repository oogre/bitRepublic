import React, { Component } from 'react';
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
			<div className="container">

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
	};
})(UserLogInOut);