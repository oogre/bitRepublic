import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class UserSignup extends Component {
	constructor(props){
		super(props);
	}

	handleSignup(event){
		event.preventDefault();
		const firstname = ReactDom.findDOMNode(this.refs.firstname).value;
		const lastname = ReactDom.findDOMNode(this.refs.lastname).value;
		const email = ReactDom.findDOMNode(this.refs.email).value;
		const country = ReactDom.findDOMNode(this.refs.country).value;
		Meteor.call('users.create', {
			username : firstname+"."+lastname,
			email : email,
			profile : {
				firstname : firstname,
				lastname : lastname,
				country : country
			}
		}, (err, res) => {
			console.log(err, res);
			if(err){
				console.log(err.reason);
			}else{
				ReactDom.findDOMNode(this.refs.firstname).value = '';
				ReactDom.findDOMNode(this.refs.lastname).value = '';
				ReactDom.findDOMNode(this.refs.email).value = '';
				ReactDom.findDOMNode(this.refs.country).value = '';
				if(_.isFunction(this.props.onSuccess)){
					this.props.onSuccess(res.data);
				}
			}
		});
		
	}

	render() {
		return (
			<div className={"container"+ " " + (this.props.visible ? "" : "hidden")}>
				<form className="login-user" onSubmit={this.handleSignup.bind(this)}>
					<input
						type="text"
						ref="firstname"
						name="firstname"
						placeholder="first name"
					/>
					<input
						type="text"
						ref="lastname"
						name="lastname"
						placeholder="last name"
					/>
					<input
						type="email"
						ref="email"
						name="email"
						placeholder="yout email"
					/>
					<input
						type="text"
						ref="country"
						name="country"
						placeholder="yout country"
					/>
					<input type="submit" value="confirm" />
				</form> 
			</div>
		);
	}
}