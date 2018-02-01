import React, { Component } from 'react';

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

// App component - represents the whole app
export default class Redistribution extends Component {
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
									Meteor.userId() ?
										<a	className="button--secondary"
											href={FlowRouter.path("userProfile", {username : Meteor.user().username})}
										>
											{Meteor.user().username}
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
						<WalletList />
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

