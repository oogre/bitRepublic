/*----------------------------------------*\
  web.bcksp.es - delete.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-08-09 18:43:27
  @Last Modified time: 2018-11-07 00:03:29
\*----------------------------------------*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { config } from '../../startup/config.js';
import { DeleteAccount } from '../../api/users/methods.js';
import MessageError from '../message/error.js';
import Confirm from '../Confirm.js';
import FixeWait from '../fixe/wait.js';

import T from './../../i18n/index.js';

// App component - represents the whole app
export default class UserDelete extends Component {
	constructor(props){
		super(props);
		this.state = {
			'error' : false,
			'error-login' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false,
			success : false,
			message : ""
		};
	}
	handleCancelDeleteAccount(event){
		ReactDom.findDOMNode(this.refs.password).value = "";
		this.setState({
			success : false
		});
	}
	handleConfirmDeleteAccount(event){
		event.preventDefault();
		this.setState({
			success : true
		});
	}
	handleDeleteAccount(event){
		
		
		this.setState({
			success : false,
			'error' : false,
			'error-login' : false,
			'is-loading' : true,
			'has-error' : false,
			'has-success' : false
		});
		const data = {
			password : Package.sha.SHA256(ReactDom.findDOMNode(this.refs.password).value)
		}
		
		DeleteAccount.call(data, (err, res) =>{
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
			this.setState({
				'has-success' : true,
				'success' : true,
				message : res.message
			});
			FlowRouter.go("home");
		});
	}


	handleAlertSuccess(){
		this.setState({'success' : false});
	}
	render() {
		//<HeaderMenu />
		return (
			<form className="form form--delete" onSubmit={this.handleConfirmDeleteAccount.bind(this)}>
				<div className="fields-row">
					<label className="field__label">
						<T>UserDelete.form</T>
					</label>
					<input
						type="password"
						ref="password"
						name="password"
						placeholder={i18n.createTranslator("Menu")("typeYourPassword")}
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
				<div className="fields-row">
					{this.state['is-loading'] ? <FixeWait /> : null }
					<input
						type="submit"
						value={i18n.createTranslator("Menu")("deactivateAccount")}
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
				<Confirm 
					open={this.state.success} 
					message={i18n.createTranslator("UserDelete")("confirm")} 
					onFail={this.handleCancelDeleteAccount.bind(this)} 
					onSuccess={this.handleDeleteAccount.bind(this)}
				/>
			</form>
		);
  	}
}
