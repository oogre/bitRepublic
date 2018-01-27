import React, { Component } from 'react';
// https://reactcommunity.org/react-modal/
import ReactModal from 'react-modal';

import UserSignup from './signup.js';
import UserLogIn from './login.js';

ReactModal.setAppElement('body');

export default class UserModal extends Component {
	constructor(props){
		super(props);
		this.state = {
			showModal: false,
			selectedProcess : this.props.process
		};
		this.closeCallBack = null;
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
	handleChangeProcess(selectedProcess){
		this.setState({ selectedProcess: selectedProcess })
	}

	handleCloseModal (event) {
		if(_.isObject(event))event.preventDefault();
		this.setState({ 
			showModal: false,
			selectedProcess: this.props.process
		});
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
					
					<UserLogIn visible={this.state.selectedProcess == "login"} onSuccess={this.handleCloseModal.bind(this)}/>
					<UserSignup visible={this.state.selectedProcess == "signup"} onSuccess={this.handleCloseModal.bind(this)}/>
					<br/>
					<a 
						className={this.state.selectedProcess == "signup" ? "" : "hidden"} 
						href="#" 
						onClick={this.handleChangeProcess.bind(this, "login")}
					>
						Login
					</a>
					<a 
						className={this.state.selectedProcess == "login" ? "" : "hidden"}
						href="#" 
						onClick={this.handleChangeProcess.bind(this, "signup")}
					>
						Signup
					</a>
				</ReactModal>
			</div>
		);
	}
}