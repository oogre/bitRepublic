/*----------------------------------------*\
  bitRepublic - main.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 21:48:05
  @Last Modified time: 2018-05-31 19:07:09
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import UserModal from '../user/modal.js';
import * as Utilities from '../../utilities.js'

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
		Utilities.CreateBitsoil();
		this.state.modal.handleOpenModal();
	}
	handleOpenMobileMenu(){
		Utilities.CreateBitsoil();
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
					<span className="sr-only">Open Menu</span>
				</button>
				<ul className={"menu menu--header" + " " + (this.state.mobileMenu ? "visible" : "")}>
					<li className="menu__item">
						<a className={"menu__item__link " + (FlowRouter.current().route.name == "about" ? "active" : "")} href={FlowRouter.path("about")}>About</a>
					</li>
					<li className="menu__item">
						<a className={"menu__item__link " + (FlowRouter.current().route.name == "home" ? "active" : "")} href={FlowRouter.path("home") + "#taxbot"}>Design your taxbot</a>
					</li>
					<li className="menu__item">
						<a className={"menu__item__link " + (FlowRouter.current().route.name == "redistribution" ? "active" : "")} href={FlowRouter.path("redistribution")} >Take part in the redistribution</a>
					</li>
					<li className="menu__item">
						<a className={"menu__item__link " + (FlowRouter.current().route.name == "installation" ? "active" : "")} href={FlowRouter.path("installation")}>Installation</a>
					</li>
					<li className="menu__item">
						<a className={"menu__item__link " + (FlowRouter.current().route.name == "whoweare" ? "active" : "")} href={FlowRouter.path("whoweare")}>Who We Are</a>
					</li>
					<li className="menu__item">
						{
							this.props.userId ?
							<a
								className={"menu__item__link " + (FlowRouter.current().route.name == "userProfile" ? "active" : "") + " " + (FlowRouter.current().route.name == "userUpdate" ? "active" : "")}
								href={FlowRouter.path("userProfile", {username : this.props.username})}
							>
								{this.props.username}
							</a>
						:
							<a href="#" className="menu__item__link" onClick={this.handleOpenModal.bind(this)}>Log in</a>
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
