import React, { Component } from 'react';
// https://reactcommunity.org/react-modal/
import ReactModal from 'react-modal';
import UserSignup from './signup.js';

ReactModal.setAppElement('body');


export default class UserSignupModal extends Component {
	constructor(props){
		super(props);
		this.state = {
			showModal: false
		};

		this.props.botData
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}
	
	componentDidMount () {
		if (this.props.onMounted) {
			this.props.onMounted(this)
		}
	}

	handleOpenModal () {
		this.setState({ showModal: true });
	}

	handleCloseModal (event) {
		event.preventDefault();
		this.setState({ showModal: false });
		return false;
	}

	render() {
		return (
			<div className="container">
				<ReactModal 
					isOpen={this.state.showModal || this.props.open}
					contentLabel="Minimal Modal Example"
					onRequestClose={this.handleCloseModal}
				>
					<a href="#" onClick={this.handleCloseModal}>&times;</a>
					<UserSignup modal={this}/>
				</ReactModal>
			</div>
		);
	}
}