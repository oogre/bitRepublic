/*----------------------------------------*\
  bitRepublic - profile.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 16:01:12
  @Last Modified time: 2018-11-06 23:12:49
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import * as Utilities from '../../utilities.js'
import { Wallets } from '../../api/wallets/wallets.js';

import BitsoilSplitter from '../bitsoil/splitter.js';
import HeaderMenu from '../menu/header.js';
import FooterMenu from '../menu/footer.js';
import UserMenu from '../menu/user.js';
import WalletDetail from '../wallet/detail.js';
import BotInfo from '../bot/info.js';
import UserAvatar from './avatar.js';
import FixeWait from '../fixe/wait.js';
import { config } from '../../startup/config.js';
import T from './../../i18n/index.js';
// App component - represents the whole app
class UserProfile extends Component {
	constructor(props){
		super(props);
	}

	render() {
		
		return (
			<div className="page">
				<HeaderMenu />
				<div className="page__content">
					<div className="profile__header">
						<div className="container">
							<UserMenu />
							{
							this.props.isReady ?
								<div className="user-summary">
									<UserAvatar update={false}/>
									<span className="user-summary__name">
										<div className={"counter--simple counter--no-currency " + (config.NO_BLOCK.includes(i18n.getLocale()) ? "no-block" : "")}>
											<BitsoilSplitter substitution="" input={this.props.currentUser.username}/>
										</div>
									</span>
								</div>
							:
								<FixeWait/>
							}
						</div>
					</div>
					{
					this.props.isReady ?
						(this.props.wallet ? <WalletDetail wallet={this.props.wallet}/> : null)
					:
						<FixeWait/>
					}
					<BotInfo />
				</div>
				<FooterMenu />
			</div>
		);
  	}
}
export default withTracker(() => {
	let myWalletReady = FlowRouter.subsReady("my.wallet");
	let myFilesImagesReady = FlowRouter.subsReady("my.files.images");
	let isReady = myWalletReady && Meteor.user() && myFilesImagesReady;

	return {
		isReady : isReady,
		userId : Meteor.userId(),
		currentUser : Meteor.user(),
		wallet : Wallets.findOne({owner : Meteor.userId()}, {fields : {number : 1, bitsoil:1, key:1, publicKey:1}})
	};
})(UserProfile);
