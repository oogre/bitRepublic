/*----------------------------------------*\
  bitRepublic - form.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 16:11:04
  @Last Modified time: 2018-02-05 15:59:04
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDom from 'react-dom';

import { UpdateUser } from '../../api/users/methods.js';
import { config } from '../../startup/config.js';

import MessageError from '../message/error.js';
import FixeWait from '../fixe/wait.js';

class UserForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			firstname: this.props.firstname,
			lastname : this.props.lastname,
			username : this.props.username,
			email : this.props.email,
			'error' : false,
			'error-login' : false,
			'error-firstname' : false,
			'error-lastname' : false,
			'error-username' : false,
			'error-email' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false
		};
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			firstname: nextProps.firstname,
			lastname : nextProps.lastname,
			username : nextProps.username,
			email : nextProps.email
		});
	}

	handleSubmit(event){
		event.preventDefault();
		this.setState({
			'error' : false,
			'error-login' : false,
			'error-firstname' : false,
			'error-lastname' : false,
			'error-username' : false,
			'error-email' : false,
			'is-loading' : true,
			'has-error' : false,
			'has-success' : false
		});

		const data = {
			firstname : ReactDom.findDOMNode(this.refs.firstname).value,
			lastname : ReactDom.findDOMNode(this.refs.lastname).value,
			username : ReactDom.findDOMNode(this.refs.username).value,
			email : ReactDom.findDOMNode(this.refs.email).value,
		}

		UpdateUser.call(data, (err, res)=>{
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
			this.setState({'has-success' : true});
			alert(res.message);
		});
	}
	handleOnChange(e){
		this.setState({[e.target.name]: e.target.value})
	}
	renderForm(){
		return (
			<form className="form form--profile" onSubmit={this.handleSubmit.bind(this)}>
				<div className="fields-row">
					<label className="field__label">
						First Name:
					</label>
					<input
						type="text"
						ref="firstname"
						name="firstname"
						value={this.state.firstname}
						onChange={this.handleOnChange.bind(this)}
					/>
					{
						this.state["error-firstname"] ?
							<MessageError
								error={this.state["error-firstname"]}
								messages={config.FORM.ERRORS.firstname}
							/>
						:
							null
					}
				</div>
				<div className="fields-row">
					<label className="field__label">
						Last Name:
					</label>
					<input
						type="text"
						ref="lastname"
						name="lastname"
						value={this.state.lastname}
						onChange={this.handleOnChange.bind(this)}
					/>
					{
						this.state["error-lastname"] ?
							<MessageError
								error={this.state["error-lastname"]}
								messages={config.FORM.ERRORS.lastname}
							/>
						:
							null
					}
				</div>
				<div className="fields-row">
					<label className="field__label">
						User Name:
					</label>
					<input
						type="text"
						ref="username"
						name="username"
						value={this.state.username}
						onChange={this.handleOnChange.bind(this)}
					/>
					{
						this.state["error-username"] ?
							<MessageError
								error={this.state["error-username"]}
								messages={config.FORM.ERRORS.username}
							/>
						:
							null
					}
				</div>
				<div className="fields-row">
					<label className="field__label">
						Email:
					</label>
					<input
						type="email"
						ref="email"
						name="email"
						value={this.state.email}
						onChange={this.handleOnChange.bind(this)}
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
				</div>
				<div className="fields-row text-right">
					{this.state['is-loading'] ? <FixeWait /> : null }
					<input
						type="submit"
						value="save"
						className={
							"button--primary button--submit "+
							(this.state['is-loading'] ? "loading " : "") +
							(this.state['has-success'] ? "success " : "") +
							(this.state['has-error'] ? "error " : "")
						}
					/>
					{ this.state["error-login"] ? <MessageError error={ this.state["error-login"] } messages={ config.FORM.ERRORS.login } /> : null }
					{ this.state["error"] ? <MessageError error={this.state["error"]} messages={[]} /> : null }
				</div>
			</form>
		);
	}
	render() {
		//<HeaderMenu />
		return (
			this.props.isReady ? this.renderForm() : <FixeWait />
		);
  	}
}


export default withTracker(() => {
	let currentUser = Meteor.user();
	let isReady = !!currentUser;
	let username = currentUser ? currentUser.username : "";
	let firstname = currentUser && currentUser.profile ? currentUser.profile.firstname : "";
	let lastname = currentUser && currentUser.profile ? currentUser.profile.lastname : "";
	let email = currentUser && currentUser.emails && currentUser.emails[0] ? currentUser.emails[0].address : "";

	return {
		isReady : isReady,
		firstname : firstname,
		lastname : lastname,
		username : username,
		email : email
	};
})(UserForm);
