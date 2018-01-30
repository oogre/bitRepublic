import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { LoginUser } from '../../api/users/methods.js';
import { ForgotPassword } from '../../api/users/methods.js';
import MessageError from '../message/error.js';
import { config } from '../../startup/config.js';
export default class UserLogIn extends Component {
	constructor(props){
		super(props);
		this.state = {
			'error' : false,
			'error-email' : false,
			'error-password' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false
		};
	}

	handleLogin(event){
		event.preventDefault();
		this.setState({
			'error' : false,
			'error-email' : false,
			'error-password' : false,
			'is-loading' : true,
			'has-error' : false,
			'has-success' : false
		});

		const data = {
			email : ReactDom.findDOMNode(this.refs.email).value,
			password : ReactDom.findDOMNode(this.refs.password).value
		};
		
		LoginUser.call(data, (err, res) => {
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
			this.setState({'is-loading' : true});
			Meteor.loginWithPassword(data.email, data.password, (err) => {
				this.setState({'is-loading' : false});
				if(err){
					this.setState({
						'has-error' : true,
						error : err.reason
					});
					return;
				}
				this.setState({'has-success' : true});
				ReactDom.findDOMNode(this.refs.email).value = '';
				ReactDom.findDOMNode(this.refs.password).value = '';
				if(_.isFunction(this.props.onSuccess)){
					this.props.onSuccess(Meteor.userId());
				}
			});
		});
	}

	handleForgotPassword(event){
		event.preventDefault();
		this.setState({
			'error' : false,
			'error-email' : false,
			'error-password' : false,
			'is-loading' : true,
			'has-error' : false,
			'has-success' : false
		});

		const data = {
			email : ReactDom.findDOMNode(this.refs.email).value
		};

		ForgotPassword.call(data, (err, res) => {
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
			this.setState({'is-loading' : true});
			Accounts.forgotPassword(data, (err) => {
				this.setState({'is-loading' : false});
				if(err){
					this.setState({
						'has-error' : true,
						error : err.reason
					});
					return;
				}
				alert("You'll receive soon an email to reset your password.");
			});
		});
		
		
		return false;
	}


	render() {
		return (
			<div className={"container"+ " " + (this.props.visible ? "" : "hidden")}>
				<form className="login-user" onSubmit={this.handleLogin.bind(this)}>
					<input
						type="email"
						ref="email"
						name="email"
						placeholder="Type your email"
					/>
					{ 	
						this.state["error-email"] ? 
							<MessageError 
								error={this.state["error-email"]} 
								messages={config.FORM.ERRORS.email}
							/>
						:
							null
					}
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
					<input 
						type="submit" 
						value="Login" 
						className={
							(this.state['is-loading'] ? "loading " : "") + 
							(this.state['has-success'] ? "success " : "") + 
							(this.state['has-error'] ? "error " : "")
						}/>
					{ 	
						this.state["error"] ? 
							<MessageError 
								error={this.state["error"]} 
								messages={[]}
							/>
						:
							null
					}
					<br/>
					<a href="#" onClick={this.handleForgotPassword.bind(this)}>
						forgot password ? 
					</a>
				</form> 
			</div>
		);
	}
}