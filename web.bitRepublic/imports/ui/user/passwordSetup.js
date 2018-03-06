/*----------------------------------------*\
  dev - enrollment.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-20 13:29:36
  @Last Modified time: 2018-02-20 14:50:00
\*----------------------------------------*/

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';

// https://reactcommunity.org/react-modal/
import ReactModal from 'react-modal';

import MessageError from '../message/error.js';
import FixeWait from '../fixe/wait.js';


import { config } from '../../startup/config.js';

//ReactModal.setAppElement('body');

export default class UserPasswordSetup extends Component {
	constructor(props){
		super(props);
		this.state = {
			showModal: true,
			'error' : false,
			'error-password' : false,
			'error-password-check' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false
		};
		this.closeCallBack = null;
	}
	handleSetPwd (event){
		event.preventDefault();
		this.setState({
			'error' : false,
			'error-password' : false,
			'error-password-check' : false,
			'is-loading' : true,
			'has-error' : false,
			'has-success' : false
		});

		const data = {
			password : ReactDom.findDOMNode(this.refs.password).value,
			"password-check" : ReactDom.findDOMNode(this.refs["password-check"]).value
		};
		if(data.password.length < config.PWD_LENGTH.MIN){
			this.setState({
				"has-error" : true,
				"error-password" : "tooShort"
			});
			return false;
		}
		if(data.password.length > config.PWD_LENGTH.MAX){
			this.setState({
				"has-error" : true,
				"error-password": "tooLong"
			});
			return false;
		}
		if(data.password != data["password-check"]){
			this.setState({
				"has-error" : true,
				"error-password-check" : "corrupted"
			});
			return false;
		}

		Accounts.resetPassword(this.props.token, data.password, (err) => {
			this.setState({'is-loading' : false});
			if (err) {
				this.setState({
					"has-error": true,
					"error":err.reason || err.message
				});
				return;
			}
			this.setState({'has-success' : true});
			ReactDom.findDOMNode(this.refs.password).value = '';
			ReactDom.findDOMNode(this.refs["password-check"]).value = '';
			if (_.isFunction(this.props.onComplete)) {
				this.props.onComplete();
			}
		});
		return false;
	}
	render() {
		console.log(this.props.token);
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
				top                        : '50%',
				left                       : '50%',
				minWidth				   :  "300px",
				maxWidth				   :  "460px",
				width				   	   :  "50% ",
				right                      : 'auto',
				bottom                     : 'auto',
				marginRight           	   : '-50%',
				transform                  : 'translate(-50%, -50%)',
				border                     : '0',
				backgroundColor   		   : 'rgba(255, 255, 255, 0.9)',
				color                      : '#342e30',
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
					style={modalStyle}
					className="modal--tiny"
				>
					<div className="modal__wrapper">
						<div className="modal__container">
							<form className="login-user" onSubmit={this.handleSetPwd.bind(this)}>
								<div className="fields-row">
									<label className="field__label">
										Password:
									</label>
									<input
										type="password"
										ref="password"
										name="password"
										placeholder="Type your password"
									/>
									{
										this.state["error-password"] ?
											<MessageError
												error={this.state["error-password"]}
												messages={config.FORM.ERRORS.password}
											/>
										:
											null
									}
								</div>
								<div className="fields-row">
									<label className="field__label">
										Retype Password:
									</label>
									<input
										type="password"
										ref="password-check"
										name="password-check"
										placeholder="Retype your password"
									/>
									{
										this.state["error-password-check"] ?
											<MessageError
												error={this.state["error-password-check"]}
												messages={config.FORM.ERRORS["password-check"]}
											/>
										:
											null
									}
								</div>
								<div className="fields-row">
									<input
										className={
											"button--primary--fw" +
											(this.state['is-loading'] ? "loading " : "") +
											(this.state['has-success'] ? "success " : "") +
											(this.state['has-error'] ? "error " : "")
										}
										type="submit"
										value="set password"
									/>
									{ this.state["error"] ? <MessageError error={this.state["error"]} messages={[]} /> : null }
									{ this.state['is-loading'] ? <FixeWait /> : null }
								</div>
							</form>
						</div>
					</div>
				</ReactModal>
			</div>
		);
	}
}
