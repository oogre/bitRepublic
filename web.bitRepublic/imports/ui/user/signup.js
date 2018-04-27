/*----------------------------------------*\
  bitRepublic - signup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 19:46:12
  @Last Modified time: 2018-04-12 11:16:08
\*----------------------------------------*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { CreateUser } from '../../api/users/methods.js';
import { config } from '../../startup/config.js';

import MessageError from '../message/error.js';
import FixeWait from '../fixe/wait.js';
import Alert from '../Alert.js';

export default class UserSignup extends Component {
	constructor(props){
		super(props);
		this.state = {
			'error' : false,
			'error-firstname' : false,
			'error-lastname' : false,
			'error-email' : false,
			'error-target' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false,
			selectedOption : '',
			success : false,
			'has-userId' : false,
			message : "",
			target : null
		};
	}

	handleSignup(event){
		event.preventDefault();
		this.setState({
			'error' : false,
			'error-firstname' : false,
			'error-lastname' : false,
			'error-target' : false,
			'error-email' : false,
			'is-loading' : true,
			'has-error' : false,
			'has-success' : false
		});

		if(this.props.children && _.isEmpty(this.state.target)){
			this.setState({
				'is-loading' : false,
				'has-error' : true,
				'error-target' : "required"
			});
		}

		const data = {
			firstname : ReactDom.findDOMNode(this.refs.firstname).value,
			lastname : ReactDom.findDOMNode(this.refs.lastname).value,
			email : ReactDom.findDOMNode(this.refs.email).value
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
			}
			if(err){
				this.setState({'has-error' : true});
				this.setState({
					["error"] : err.message
				});
			}
			if(this.state['has-error']){
				return;
			}

			this.setState({
				'has-success' : true,
				selectedOption : '',
				'success' : true,
				'has-userId' : res.data,
				message : res.message
			});
		});
	}

	handleAlertSuccess(){
		this.setState({'success' : false});
		if(_.isFunction(this.props.onSuccess)){
			this.props.onSuccess(this.state['has-userId'], this.state.target);
		}
	}

	handleChangeTarget(selectedOption){
		this.setState({ selectedOption : selectedOption});
	}

	handleTarget(value){
		this.setState({ target : value});
	}

	render() {
		const { selectedOption } = this.state;
  		const value = selectedOption && selectedOption.value;
  		var self     = this;
  		return (
			<div className={(this.props.visible ? "" : "hidden")}>
				<form
					className="login-user"
					onSubmit={this.handleSignup.bind(this)}
					autoComplete="false"
				>
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
						{
							this.props.children ?
								<div className="fields-column">
									{
										React.Children.map(this.props.children, (child, k) => (
											<div key={k}>
												{
													React.cloneElement(child, {
														onTargetSelected: self.handleTarget.bind(self),
														error : self.state["error-target"]
													})
												}
											</div>
										))
									}
								</div>
							:
								null
						}



						<div className="fields-column">
							<input
								type="email"
								ref="email"
								name="email"
								placeholder="your email"
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
					</div>
					{this.state['is-loading'] ? <FixeWait /> : null }
					<div className="fields-row text-right">
						<input
							className={
								"button--secondary " +
								(this.state['is-loading'] ? "loading " : "") +
								(this.state['has-success'] ? "success " : "") +
								(this.state['has-error'] ? "error " : "")
							}
							type="submit"
							value="confirm"
						/>
						{ this.state["error"] ? <MessageError error={this.state["error"]} messages={[]} /> : null }
					</div>
				</form>
				<Alert open={this.state.success} message={this.state.message} onSuccess={this.handleAlertSuccess.bind(this)}/>
			</div>
		);
	}
}
