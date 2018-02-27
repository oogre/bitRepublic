/*----------------------------------------*\
  bitRepublic - modal.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 19:46:12
  @Last Modified time: 2018-02-20 13:01:44
\*----------------------------------------*/
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

		const modalStyle = {
			overlay : {
				position          : 'fixed',
				top               : 0,
				left              : 0,
				right             : 0,
				bottom            : 0,
				backgroundColor   : 'rgba(40, 40, 40, 0.9)',
				zIndex            : 9999
			},
			content : {
				position                   : 'absolute',
				top                        : '0',
				left                       : '0',
				right                      : '0',
				bottom                     : '0',
				border                     : '0',
				background                 : 'transparent',
				overflow                   : 'auto',
				WebkitOverflowScrolling    : 'touch',
				borderRadius               : '0',
				outline                    : 'none',
				padding                    : '20px'
			}
		}

		return (
			<div className="container">
				<ReactModal
					isOpen={this.state.showModal || this.props.open}
					contentLabel="Minimal Modal Example"
					onRequestClose={this.handleCloseModal.bind(this)}
					style={modalStyle}
				>
					<div className="modal__wrapper">
						<div className="modal__container">
							<a className="modal__close" href="#" onClick={this.handleCloseModal.bind(this)}>&times;</a>
							{
								this.props.title ?
									<h2>{this.props.title}</h2>
								:
									""
							}
							<UserLogIn visible={this.state.selectedProcess == "login"} onSuccess={this.handleCloseModal.bind(this)}/>
							<UserSignup visible={this.state.selectedProcess == "signup"} onSuccess={this.handleCloseModal.bind(this)}/>
							<div className="field__row text-right">
								<a
									className={"modal__link" + " " + (this.state.selectedProcess == "signup" ? "" : "hidden")}
									href="#"
									onClick={this.handleChangeProcess.bind(this, "login")}
								>
									Login
								</a>
								<a
									className={"modal__link" + " " + (this.state.selectedProcess == "login" ? "" : "hidden")}
									href="#"
									onClick={this.handleChangeProcess.bind(this, "signup")}
								>
									Signup
								</a>
							</div>
						</div>
					</div>
				</ReactModal>
			</div>
		);
	}
}
