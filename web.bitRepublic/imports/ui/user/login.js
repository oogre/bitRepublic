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
					<input
						type="password"
						ref="password"
						name="password"
						placeholder="Type your password"
					/>
					<input type="submit" value="Login" />
				</form> 
			</div>
		);
	}
}