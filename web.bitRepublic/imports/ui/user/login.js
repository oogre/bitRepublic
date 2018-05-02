/*----------------------------------------*\
  bitRepublic - login.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 19:46:12
  @Last Modified time: 2018-05-02 19:06:19
\*----------------------------------------*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { config } from '../../startup/config.js';
import { ForgotPassword } from '../../api/users/methods.js';
import { LoginUser } from '../../api/users/methods.js';


import MessageError from '../message/error.js';
import FixeWait from '../fixe/wait.js';
import Alert from '../Alert.js';

export default class UserLogIn extends Component {
	constructor(props){
		super(props);
		this.state = {
			'error' : false,
			'error-email' : false,
			'error-password' : false,
			'error-target' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false,
			success : false,
			target : null
		};
	}
	handleAlertSuccess(){
		this.setState({'success' : false});
	}

	componentDidMount () {
		if (this.props.onMounted) {
			this.props.onMounted(this)
		}
	}

	handleForgotPassword(event){
		console.log("LO");
		event.preventDefault();
		this.setState({
			'error' : false,
			'error-email' : false,
			'error-password' : false,
			'error-target' : false,
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
				this.setState({'success' : true});
			});
		});
		return false;
	}
	handleTarget(value){
		this.setState({ target : value});
	}

	handleLogin(event){
		event.preventDefault();
		this.setState({
			'error' : false,
			'error-email' : false,
			'error-password' : false,
			'error-target' : false,
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
			if(Meteor.userId()){
				return;
			}
		}

		if(Meteor.userId()){
			if(_.isFunction(this.props.onSuccess)){
				this.props.onSuccess(Meteor.userId(), this.state.target);
			}
			return;
		}

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
			}
			if(this.state['has-error']){
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
				}
				if(this.state['has-error']){
					return;
				}
				this.setState({'has-success' : true});

				if(_.isFunction(this.props.onSuccess)){
					this.props.onSuccess(Meteor.userId(), this.state.target);
				}
			});
		});
	}


	render() {
		var self     = this;
		let isCEOS = this.props.selectedBot && this.props.selectedBot.target == "ceos";
		let isPOLITICS = this.props.selectedBot && this.props.selectedBot.target == "politics";
		let isFRIENDS = this.props.selectedBot && this.props.selectedBot.target == "friends";
		
		return (
			<div className={(this.props.visible ? "" : "hidden")}>

				
				<form className="login-user" onSubmit={this.handleLogin.bind(this)}>


							{
								!Meteor.userId() && (isPOLITICS || isCEOS) ?  
									<div className="fields-row">
										<div className="fields-column">
											<span>
												<h2 className="modal__title">Awesome!</h2>
												<span className="modal__subtitle">
													<p>
														Got your tweet.<br/>
														Which world leader you want.
													</p>
												</span>
											</span>
										</div>
									</div>
								:
									null
							}
							{
								!Meteor.userId() && isFRIENDS ?  
									<div className="fields-row">
										<div className="fields-column">
											<span>
												<h2 className="modal__title">Hey!</h2>
												<span className="modal__subtitle">
													<p>
														You did it.<br/>
														Got your tweet!
													</p>
												</span>
											</span>
										</div>
									</div>
								:
									null
							}
					{
						this.props.children ?
							<div className="fields-row">
								<div className="fields-column">
									{
										Meteor.userId() ?
											<span>
												<h2 className="modal__title">Hey, you did it once again.</h2>
												<span className="modal__subtitle">
													<p>
														Glad to join the band!
													</p>
												</span>
											</span>
										:
											null
									}
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
							</div>
						:
							null
					}
					{
						Meteor.userId() ?
							null
						:
							<div className="fields-row">
								<div className="fields-column">
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
								</div>
								<div className="fields-column">
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
								</div>
							</div>
					}

					
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
							value={Meteor.userId() ? "Activation" : "Log in"}
						/>
						{ this.state["error"] ? <MessageError error={this.state["error"]} messages={[]} /> : null }
					</div>
				</form>
				<Alert open={this.state.success} message="You'll receive soon an email to reset your password." onSuccess={this.handleAlertSuccess.bind(this)}/>
			</div>
		);
	}
}
