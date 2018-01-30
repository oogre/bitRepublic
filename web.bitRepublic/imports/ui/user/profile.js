import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import * as Utilities from '../../utilities.js'
import { Wallets } from '../../api/wallets/wallets.js';

import HeaderMenu from '../menu/header.js';
import FooterMenu from '../menu/footer.js';
import UserMenu from '../menu/user.js';
import WalletDetail from '../wallet/detail.js';
import BotInfo from '../bot/info.js';
import UserAvatar from './avatar.js';

// App component - represents the whole app
class UserProfile extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<div className="container">
				<HeaderMenu />
				<UserMenu />
				<UserAvatar update={false}/><br/>
				{this.props.username}<br/>
				{ this.props.wallet ? <WalletDetail wallet={this.props.wallet}/> : null }
				<BotInfo />
				<FooterMenu />
			</div>
		);
  	}
}
export default withTracker(() => {
	let currentUser = Meteor.user();
	let username = currentUser ? currentUser.username : null;
	let userId = currentUser ? currentUser._id : null;
	let wallet = Wallets.findOne({owner : userId});
	return {
		userId : userId,
		currentUser : currentUser,
		username : username,
		wallet : wallet
	};
})(UserProfile);