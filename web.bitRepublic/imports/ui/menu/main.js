/*----------------------------------------*\
  bitRepublic - main.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 21:48:05
  @Last Modified time: 2018-02-06 14:36:38
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import UserModal from '../user/modal.js';
import { BitsoilCreate } from '../../api/bitsoils/methods.js';
import { config } from '../../startup/config.js';

class MainMenu extends Component {
	constructor(props){
		super(props);
		this.state = {
			modal : 0,
			mobileMenu: false
		}
	}

	handleLogout(event){
		event.preventDefault();
		Meteor.logout();
	}
	handleModalMounted(modal){
		this.setState({ modal: modal});
		modal.onClose(function(userId){
			if(userId && Meteor.user()){
				FlowRouter.go("userProfile", {username : Meteor.user().username})
			}
		});
	}
	handleOpenModal(){
		BitsoilCreate.call({bitsoil : config.BITSOIL_UNIT.MIN});
		this.state.modal.handleOpenModal();
	}
	handleOpenMobileMenu(){
		BitsoilCreate.call({bitsoil : config.BITSOIL_UNIT.MIN});
		this.setState({
			mobileMenu: !this.state.mobileMenu
		});
	}
	
	render() {
			return (
			<nav>
				<button type="button" className="menu--header__mobile-trigger" onClick={this.handleOpenMobileMenu.bind(this)}>
					<div className="bar"></div>
					<div className="bar"></div>
					<div className="bar"></div>
				</button>
				<ul className={"menu menu--header" + " " + (this.state.mobileMenu ? "visible" : "")}>
					<li className="menu__item">
						<a className="menu__item__link" href={FlowRouter.path("about")}>About</a>
					</li>
					<li className="menu__item">
						<a className="menu__item__link" href={FlowRouter.path("home") + "#taxbot"}>Design your taxbot</a>
					</li>
					<li className="menu__item">
						<a className="menu__item__link" href={FlowRouter.path("redistribution")} >Take part of the redistribution</a>
					</li>
					<li className="menu__item">
						<a className="menu__item__link" href={FlowRouter.path("installation")}>Installation</a>
					</li>
					<li className="menu__item">
						<a className="menu__item__link" href={FlowRouter.path("contact")}>WHO WE ARE</a>
					</li>
					<li className="menu__item">
						{
							this.props.userId ?
							<a 
								className="menu__item__link" 
								href={FlowRouter.path("userProfile", {username : this.props.username})} 
							>
								{this.props.username}
							</a>
						:
							<a href="#" className="menu__item__link" onClick={this.handleOpenModal.bind(this)}>Login</a>
						}
						<UserModal
							process="login"
							onMounted={this.handleModalMounted.bind(this)}
						/>
					</li>
				</ul>
			</nav>
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
})(MainMenu);
