/*----------------------------------------*\
  bitRepublic - user.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-25 18:45:10
  @Last Modified time: 2018-02-02 00:08:13
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import UserLogOut from '../user/logout.js';
// https://reactcommunity.org/react-modal/
import ReactModal from 'react-modal';

ReactModal.setAppElement('body');

class UserMenu extends Component {
	constructor(props){
		super(props);
		this.state = {
			showModal: false
		};
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}
	handleOpenModal () {
		this.setState({ showModal: true });
	}

	handleCloseModal () {
		this.setState({ showModal: false });
	}
	render() {
	    return (
			<div className="container">
				<button onClick={this.handleOpenModal}>
					COG
				</button>
				<ReactModal 
					isOpen={this.state.showModal} 
					contentLabel="Minimal Modal Example"
					onRequestClose={this.handleCloseModal}
				>
					<ul>
						<li>
							<a href={FlowRouter.path("userProfile", {username : this.props.username})} onClick={this.handleCloseModal}>Bot info</a>
						</li>
						<li>
							<a href={FlowRouter.path("userUpdate", {username : this.props.username})} onClick={this.handleCloseModal}>Update profile</a>
						</li>
						<li>
							<UserLogOut onClick={this.handleCloseModal}/>
						</li>
					</ul>
				</ReactModal>
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
})(UserMenu);