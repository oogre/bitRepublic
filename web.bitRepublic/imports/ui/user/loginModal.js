import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
// https://reactcommunity.org/react-modal/
import ReactModal from 'react-modal';
import UserLogIn from './login.js';

ReactModal.setAppElement('body');


class UserLogInModal extends Component {
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
			<div>
				<a href="#" className="menu__item__link" onClick={this.handleOpenModal}>Login</a>
				<ReactModal
					isOpen={this.state.showModal}
					contentLabel="Minimal Modal Example"
				>
					<a href="#" onClick={this.handleCloseModal}>&times;</a>
					<UserLogIn modal={this}/>
				</ReactModal>
			</div>
		);
	}
}

export default withTracker(() => {
	return {
	};
})(UserLogInModal);