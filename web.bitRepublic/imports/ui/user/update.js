import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import * as Utilities from '../../utilities.js'
import { Wallets } from '../../api/wallets/wallets.js';

import HeaderMenu from '../menu/header.js';
import FooterMenu from '../menu/footer.js';
import UserMenu from '../menu/user.js';
import WalletDetail from '../wallet/detail.js';

// App component - represents the whole app
class UserUpdate extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<div className="container">
				<HeaderMenu />
				<UserMenu />
				picture<br/>
				{this.props.username}<br/>
				
				<FooterMenu />
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
})(UserUpdate);