import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class UserLogIn extends Component {
	constructor(props){
		super(props);
	}

	handleLogin(event){
		event.preventDefault();
		const username = ReactDom.findDOMNode(this.refs.username).value;
		const pwd = ReactDom.findDOMNode(this.refs.password).value;
		Meteor.loginWithPassword(username, pwd, (err) => {
			if(err){
				console.log(err.reason);
			}else{
				ReactDom.findDOMNode(this.refs.username).value = '';
				ReactDom.findDOMNode(this.refs.password).value = '';
				if(this.props.modal){
					this.props.modal.setState({ showModal: false });
				}
			}
		});
	}

	render() {
		return (
			<div className="container">
				<form className="login-user" onSubmit={this.handleLogin.bind(this)}>
					<input
						type="text"
						ref="username"
						name="username"
						placeholder="Type your username"
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

export default withTracker(() => {
	return {
	};
})(UserLogIn);