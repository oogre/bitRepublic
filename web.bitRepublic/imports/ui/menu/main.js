import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import UserModal from '../user/modal.js';

class MainMenu extends Component {
	constructor(props){
		super(props);
		this.state = {
			modal : 0,
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
		this.state.modal.handleOpenModal();
	}
	render() {
			return (
			<nav>
				<ul className="menu menu--header">
					<li className="menu__item">
						<a className="menu__item__link" href={FlowRouter.path("about")}>About</a>
					</li>
					<li className="menu__item">
						<a className="menu__item__link" href={FlowRouter.path("home") + "#taxbot"}>Design your taxbot</a>
					</li>
					<li className="menu__item">
						<a className="menu__item__link" href="/redistribution">Take part of the redistribution</a>
					</li>
					<li className="menu__item">
						<a className="menu__item__link" href="/installation">Installation</a>
					</li>
					<li className="menu__item">
						<a className="menu__item__link" href="#">WHO WE ARE</a>
					</li>
					<li className="menu__item">
						{
						this.props.userId ?
							<a className="menu__item__link" href={FlowRouter.path("userProfile", {username : this.props.username})}>{this.props.username}</a>
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