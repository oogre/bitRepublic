import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
// https://reactcommunity.org/react-modal/
import ReactModal from 'react-modal';
import UserSignup from './signup.js';

ReactModal.setAppElement('body');


class UserSignupModal extends Component {
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
    test(){
		this.setState({ showModal: true });
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
				<ReactModal 
					isOpen={this.state.showModal || this.props.open}
					contentLabel="Minimal Modal Example"
				>
					<a href="#" onClick={this.handleCloseModal}>&times;</a>
					<UserSignup modal={this}/>
				</ReactModal>
			</div>
		);
	}
}

export default withTracker(() => {
	return {
	};
})(UserSignupModal);