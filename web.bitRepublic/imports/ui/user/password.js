import React, { Component } from 'react';

import { config } from '../../startup/config.js';
import { ResetPassword } from '../../api/users/methods.js';
import MessageError from '../message/error.js';

// App component - represents the whole app
export default class UserPassword extends Component {
	constructor(props){
		super(props);
		this.state = {
			'error-login' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false
		};
	}
	
	handleResetPassword(e){
		this.setState({
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
			this.setState({'has-success' : true});
			alert(res.message);
		});
	}
	render() {
		//<HeaderMenu />
		return (
			<div className="container">
				<label>
					Send me a mail to 
					<button 
						onClick={this.handleResetPassword.bind(this)}
						className={
							"button--primary " + 
							(this.state['is-loading'] ? "loading " : "") + 
							(this.state['has-success'] ? "success " : "") + 
							(this.state['has-error'] ? "error " : "")
						} 
					>
						Reset Password
					</button>
					{ 	
						this.state["error-login"] ? 
							<MessageError 
								error={this.state["error-login"]} 
								messages={config.FORM.ERRORS.login}
							/>
						:
							null
					}
				</label>
			</div>
		);
  	}
}