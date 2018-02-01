/*----------------------------------------*\
  bitRepublic - Redistribution.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 16:21:07
  @Last Modified time: 2018-02-02 00:08:33
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import HeaderMenu from './menu/header.js';
import SliderMenu from './menu/slider.js';
import FooterMenu from './menu/footer.js';
import RedistriutionMenu from './menu/redistribution.js';
import BitsoilTotalCounter from './bitsoil/totalCounter.js';
import FixePunchline from './fixe/punchline.js';
import FixeShortAbout from './fixe/shortAbout.js';
import WalletList from './wallet/list.js';
import UserModal from './user/modal.js';
import { BitsoilCreate } from '../api/bitsoils/methods.js';
import { config } from '../startup/config.js';

import FixeWait from './fixe/wait.js';

class Redistribution extends Component {
	constructor(props){
		super(props);
		this.state = {
			modal : 0
		}
	}

	handleOpenModal(){
		BitsoilCreate.call({bitsoil : config.BITSOIL_UNIT.MIN});
		this.state.modal.handleOpenModal();
	}

	handleModalMounted(modal){
		this.setState({ modal: modal});
		modal.onClose(function(userId){
			if(userId && Meteor.user()){
				FlowRouter.go("userProfile", {username : Meteor.user().username})
			}
		});
	}

	render() {
		return (
			<div className="page">
				<div className="page__content">
					<HeaderMenu />
					<RedistriutionMenu findOutMore={true} />
					<div>
						<div className="section-intro">
							<p>This is the total amount of bitsoils produced by all the users and their bots during the bitsoil popup hack & tax campaingn.</p>
							<p>Join us and let's make the data economy benefits everyone!</p>
						</div>

						<BitsoilTotalCounter />
						<FixePunchline description={[
							"create your personal wallet.",
							"take part of the taxation system."
						]}>
								{
									this.props.isReady ?
										<a	className="button--secondary"
											href={FlowRouter.path("userProfile", {username : this.props.currentUser.username})}
										>
											{this.props.currentUser.username}
										</a>
									:
										<a	href="#"
											className="button--secondary hero-banner__button"
											onClick={this.handleOpenModal.bind(this)}
										>
											Sign up
										</a>
								}
							<a	className="button--secondary" href={FlowRouter.path("home") + "#taxbot"}>
								Create your taxbot
							</a>
						</FixePunchline>
						<FixeShortAbout />
						{ this.props.isReady ? <WalletList /> : <FixeWait/> }
						
					</div>
				</div>
				<UserModal
					process="signup"
					onMounted={this.handleModalMounted.bind(this)}
				/>
				<FooterMenu />
			</div>
		);
	}
}

export default withTracker(() => {
	let publicWalletReady = FlowRouter.subsReady("public.wallet");
	let allWalletReady = FlowRouter.subsReady("all.wallet");
	let isReady = Meteor.user() && publicWalletReady && allWalletReady;
	return {
		isReady : isReady,
		currentUser : Meteor.user()
	};
})(Redistribution);
