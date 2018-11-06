/*----------------------------------------*\
  bitRepublic - password.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 20:10:14
  @Last Modified time: 2018-11-06 23:36:02
\*----------------------------------------*/
import React, { Component } from 'react';

import { config } from '../../startup/config.js';
import { ResetPassword } from '../../api/users/methods.js';
import MessageError from '../message/error.js';
import Alert from '../Alert.js';

import T from './../../i18n/index.js';

// App component - represents the whole app
export default class UserPassword extends Component {
	constructor(props){
		super(props);
		this.state = {
			'error' : false,
			'error-login' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false,
			success : false,
			message : ""
		};
	}

	handleResetPassword(e){
		this.setState({
			'error' : false,
			'error-login' : false,
			'is-loading' : true,
			'has-error' : false,
			'has-success' : false
		});
		ResetPassword.call({}, (err, res) =>{
			this.setState({'is-loading' : false});
			if (err && err.error === 'validation-error') {
				this.setState({'has-error' : true});
				err.details.forEach((fieldError) => {
					this.setState({
						["error-"+fieldError.name] : fieldError.type
					});
				});
				return;
			}
			if(err){
				this.setState({'has-error' : true});
				this.setState({
					["error"] : err.message
				});
				return;
			}
			this.setState({
				'has-success' : true,
				'success' : true,
				message : res.message
			});
		});
	}


	handleAlertSuccess(){
		this.setState({'success' : false});
	}
	render() {
		//<HeaderMenu />
		return (
			<div className="form--password">
				<p>
					<T>Menu.ResetPassword.label</T>:
				</p>
				<button
					onClick={this.handleResetPassword.bind(this)}
					className={
						"button--primary " +
						(this.state['is-loading'] ? "loading " : "") +
						(this.state['has-success'] ? "success " : "") +
						(this.state['has-error'] ? "error " : "")
					}
				>
					<T>Menu.ResetPassword.btn</T>
					
				</button>
				{ this.state["error"] ? <MessageError error={this.state["error"]} messages={[]} /> : null }
				{ this.state["error-login"] ? <MessageError error={this.state["error-login"]} messages={config.FORM.ERRORS.login} /> : null }
				<Alert open={this.state.success} message={this.state.message} onSuccess={this.handleAlertSuccess.bind(this)}/>
			</div>
		);
  	}
}
