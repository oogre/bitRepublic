import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { CreateUser } from '../../api/users/methods.js';
import { config } from '../../startup/config.js';
import MessageError from '../message/error.js';


export default class UserSignup extends Component {
	constructor(props){
		super(props);
		this.state = {
			'error-firstname' : false,
			'error-lastname' : false,
			'error-email' : false,
			'error-country' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false
		};
	}

	handleSignup(event){
		event.preventDefault();
		this.setState({
			'error-firstname' : false,
			'error-lastname' : false,
			'error-email' : false,
			'error-country' : false,
			'is-loading' : true,
			'has-error' : false,
			'has-success' : false
		});
		const data = {
			firstname : ReactDom.findDOMNode(this.refs.firstname).value,
			lastname : ReactDom.findDOMNode(this.refs.lastname).value,
			email : ReactDom.findDOMNode(this.refs.email).value,
			country : ReactDom.findDOMNode(this.refs.country).value
		}
		CreateUser.call(data, (err, res) =>{
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
			ReactDom.findDOMNode(this.refs.firstname).value = '';
			ReactDom.findDOMNode(this.refs.lastname).value = '';
			ReactDom.findDOMNode(this.refs.email).value = '';
			ReactDom.findDOMNode(this.refs.country).value = '';

			alert(res.message);
			if(_.isFunction(this.props.onSuccess)){
				this.props.onSuccess(res.data);
			}
		});		
	}

	render() {
		return (
			<div className={"modal__container"+ " " + (this.props.visible ? "" : "hidden")}>
				<form className="login-user" onSubmit={this.handleSignup.bind(this)}>
					<div className="fields-row">
						<div className="fields-column">
							<input
								type="text"
								ref="firstname"
								name="firstname"
								placeholder="first name"
							/>
							{ 	this.state["error-firstname"] ? 
									<MessageError 
										error={this.state["error-firstname"]} 
										messages={config.FORM.ERRORS.firstname}
									/>
								:
									null
							}
						</div>
						<div className="fields-column">
							<input
								type="text"
								ref="lastname"
								name="lastname"
								placeholder="last name"
							/>
							{ 	this.state["error-lastname"] ? 
									<MessageError 
										error={this.state["error-lastname"]} 
										messages={config.FORM.ERRORS.lastname}
									/>
								:
									null
							}
						</div>
					</div>
					<div className="fields-row">
						<div className="fields-column">
							<input
								type="email"
								ref="email"
								name="email"
								placeholder="yout email"
							/>
							{ 	this.state["error-email"] ? 
									<MessageError 
										error={this.state["error-email"]} 
										messages={config.FORM.ERRORS.email}
									/>
								:
									null
							}
						</div>
						<div className="fields-column">
							<input
								type="text"
								ref="country"
								name="country"
								placeholder="your country"
							/>
							{ 	this.state["error-country"] ? 
									<MessageError 
										error={this.state["error-country"]} 
										messages={config.FORM.ERRORS.country}
									/>
								:
									null
							}
						</div>
					</div>
					<div className="fields-row text-right">
						<input 
							className={
								"button--primary " + 
								(this.state['is-loading'] ? "loading " : "") + 
								(this.state['has-success'] ? "success " : "") + 
								(this.state['has-error'] ? "error " : "")
							} 
							type="submit" 
							value="confirm" 
						/>
					</div>
				</form>
			</div>
		);
	}
}
