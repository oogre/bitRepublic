import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class UserLogIn extends Component {
	constructor(props){
		super(props);
	}

	handleLogin(event){
		event.preventDefault();
		const email = ReactDom.findDOMNode(this.refs.email).value;
		const pwd = ReactDom.findDOMNode(this.refs.password).value;
		Meteor.loginWithPassword(email, pwd, (err) => {
			if(err){
				console.log(err.reason);
			}else{
				ReactDom.findDOMNode(this.refs.email).value = '';
				ReactDom.findDOMNode(this.refs.password).value = '';
				if(_.isFunction(this.props.onSuccess)){
					this.props.onSuccess(Meteor.userId());
				}
			}
		});
	}
	handleForgotPassword(event){
		event.preventDefault();
		const email = ReactDom.findDOMNode(this.refs.email).value;

		new SimpleSchema({
			'email': { type: String, regEx: SimpleSchema.RegEx.Email }
		}).validate({email});

		Accounts.forgotPassword({
			email
		}, function(err, res){
			console.log(err, res);
		});
		return false;
	}
	render() {
		return (
			<div className={"modal__container"+ " " + (this.props.visible ? "" : "hidden")}>
				<form className="login-user" onSubmit={this.handleLogin.bind(this)}>
					<div className="fields-row">
						<div className="fields-column">
							<input
								type="email"
								ref="email"
								name="email"
								placeholder="Type your email"
							/>
						</div>
						<div className="fields-column">
							<input
								type="password"
								ref="password"
								name="password"
								placeholder="Type your password"
							/>
						</div>
					</div>
					<div className="fields-row text-right">
						<a onClick={this.handleForgotPassword.bind(this)}>
							forgot password ?
						</a>
						<input className="button--primary" type="submit" value="Login" />
					</div>
				</form>
			</div>
		);
	}
}
