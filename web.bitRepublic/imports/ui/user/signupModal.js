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
		this.closeCallBack = null;
		this.props.botData
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}
	
	componentDidMount () {
		if (this.props.onMounted) {
			this.props.onMounted(this)
		}
	}
	onClose(callback){
		if(!_.isFunction(callback))return;
		this.closeCallBack = callback;
	}
	handleOpenModal () {
		this.setState({ showModal: true });
	}

	handleCloseModal (event) {
		if(_.isObject(event))event.preventDefault();
		this.setState({ showModal: false });
		this.closeCallBack(_.isString(event) ? event : false);
		return false;
	}

	render() {
		return (
			<div className="container">
				<ReactModal 
					isOpen={this.state.showModal || this.props.open}
					contentLabel="Minimal Modal Example"
					onRequestClose={this.handleCloseModal.bind(this)}
				>
					<a href="#" onClick={this.handleCloseModal.bind(this)}>&times;</a>
					<UserSignup onSuccess={this.handleCloseModal.bind(this)}/>
				</ReactModal>
			</div>
		);
	}
}