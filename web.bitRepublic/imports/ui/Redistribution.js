/*----------------------------------------*\
  bitRepublic - Redistribution.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 16:21:07
  @Last Modified time: 2018-10-20 12:34:17
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import HeaderMenu from './menu/header.js';
import SliderMenu from './menu/slider.js';
import FooterMenu from './menu/footer.js';
import RedistriutionMenu from './menu/redistribution.js';
import BitsoilTotalCounter from './bitsoil/totalCounter.js';
import FixePunchline from './fixe/punchline.js';
import FixeShortAboutRedistribution from './fixe/shortAboutRedistribution.js';
import WalletList from './wallet/list.js';
import UserModal from './user/modal.js';
import { BitsoilCreate } from '../api/bitsoils/methods.js';
import { config } from '../startup/config.js';

import FixeWait from './fixe/wait.js';
import T from '../i18n/index.js';

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
				<HeaderMenu />
				<div className="page__content">
					<RedistriutionMenu/>
					<div>
						<div className="container">
							<div className="section-intro">
								<p><T>textOverCounter.A</T></p>
								<p><T>textOverCounter.B</T></p>
							</div>
						</div>

						<BitsoilTotalCounter />
						<div id="redistributionLogin"></div>
						<FixePunchline description={[
							<T>Redistribution.FixePunchline.A</T>,
							<T>Redistribution.FixePunchline.B</T>
						]}>
								{
									this.props.currentUser ?
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
											<T>Menu.signup</T>
										</a>
								}
							<a	className="button--secondary" href={FlowRouter.path("home") + "#taxbot"}>
								<T>Menu.createTaxbot</T>
							</a>
						</FixePunchline>
						<div id="redistributionInfo"></div>
						<FixeShortAboutRedistribution />
						{ this.props.isReady ? <WalletList/> : <FixeWait/> }

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
	let isReady = publicWalletReady && allWalletReady;
	return {
		isReady : isReady,
		currentUser : Meteor.user()
	};
})(Redistribution);
