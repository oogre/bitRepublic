import React, { Component } from 'react';
import UserModal from '../user/modal.js';
import { withTracker } from 'meteor/react-meteor-data';

import { BitsoilCreate } from '../../api/bitsoils/methods.js';
import { config } from '../../startup/config.js';

class RedistriutionMenu extends Component {
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
			<div>
				<div className="hero-banner hero-banner--redistribution">
					<div className="container">
						<div className="hero-banner__content">
							<h2 className="hero-banner__title">TAKE PART TO THE REDISTRIBTION MECHANISM</h2>
							<ul className="buttons-list">
								<li className="buttons-list__item">
									{
										this.props.userId ?
											<a
												className="button--secondary hero-banner__button"
												href={FlowRouter.path("userProfile", {username : this.props.username})}
											>
												{this.props.username}
											</a>
										:
											<a
												href="#"
												className="button--secondary hero-banner__button"
												onClick={this.handleOpenModal.bind(this)}
											>
												Generate yout wallet
											</a>
									}
								</li>
								<li className="buttons-list__item">
									{
										this.props.findOutMore ?
											<a
												className="button--secondary hero-banner__button"
												href={FlowRouter.path("about")}
											>
												Find out more
											</a>

										:
											<a
												className="button--secondary hero-banner__button"
												href={FlowRouter.path("home") + "#taxbot"}
											>
												Create your taxbot
											</a>
									}
								</li>
							</ul>
						</div>
					</div>
				</div>
				<UserModal
					process="signup"
					onMounted={this.handleModalMounted.bind(this)}
				/>
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
})(RedistriutionMenu);
