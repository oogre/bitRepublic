/*----------------------------------------*\
  bitRepublic - update.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 21:22:03
  @Last Modified time: 2018-03-21 18:14:54
\*----------------------------------------*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { config } from '../startup/config.js';
import { UserContact } from '../api/users/methods.js';

import HeaderMenu from './menu/header.js';
import FooterMenu from './menu/footer.js';
import MessageError from './message/error.js';
import FixeWait from './fixe/wait.js';
import Alert from './Alert.js';

// App component - represents the whole app
export default class Contact extends Component {
	constructor(props){
		super(props);
		this.state = {
			'error' : false,
			'error-name' : false,
			'error-email' : false,
			'error-subject' : false,
			'error-message' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false,
			success : false,
			message : "",
		};
	}
	handleSubmit(event){
		event.preventDefault();
		this.setState({
			'error' : false,
			'error-name' : false,
			'error-email' : false,
			'error-subject' : false,
			'error-message' : false,
			'is-loading' : true,
			'has-error' : false,
			'has-success' : false
		});

		const data = {
			name : ReactDom.findDOMNode(this.refs.name).value,
			email : ReactDom.findDOMNode(this.refs.email).value,
			subject : ReactDom.findDOMNode(this.refs.subject).value,
			message : ReactDom.findDOMNode(this.refs.message).value,
			newsletterChecked : ReactDom.findDOMNode(this.refs.newsletterCheckbox).checked,
		}
		UserContact.call(data, (err, res)=>{
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
			ReactDom.findDOMNode(this.refs.name).value = "";
			ReactDom.findDOMNode(this.refs.email).value = "";
			ReactDom.findDOMNode(this.refs.subject).value = "";
			ReactDom.findDOMNode(this.refs.message).value = "";
			ReactDom.findDOMNode(this.refs.newsletterCheckbox).checked = false;
			this.setState({'has-success' : true});
			this.setState({
				'has-success' : true, 
				'success' : true,
				message : res.message
			});
		});
		return false;
	}

	handleAlertSuccess(){
		this.setState({'success' : false});
	}
	render() {
		return (
			<div className="page">
				<HeaderMenu />
				<div className="page__content">
					<div className="container">
						<div className="tabs--profile">
							<ul className="tabs-selector-list">
								<li className="tabs-selector-list__item">
									<a className="selected tabs-selector-list__button" href="#">CONTACT</a>
								</li>
							</ul>
							<div className="tab">
								<div className="tab__content">
									<form className="form form--profile" onSubmit={this.handleSubmit.bind(this)}>
										<div className="fields-row">
											<h5 className="title--quaternary">BITSOIL TAX CAMPAIGN</h5>
											<label className="field__label field__label--contact">
												@: contact@bitsoil.tax
											</label>
											<input
												type="text"
												ref="name"
												name="name"
												placeholder="YOUR NAME"
											/>
											{
												this.state["error-name"] ?
													<MessageError
														error={this.state["error-name"]}
														messages={config.FORM.ERRORS.name}
													/>
												:
													null
											}
										</div>
										<div className="fields-row">
											<input
												type="email"
												ref="email"
												name="email"
												placeholder="YOUR EMAIL"
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
										<div className="fields-row">
											<input
												type="text"
												ref="subject"
												name="subject"
												placeholder="SUBJECT"
											/>
											{
												this.state["error-subject"] ?
													<MessageError
														error={this.state["error-subject"]}
														messages={config.FORM.ERRORS.subject}
													/>
												:
													null
											}
										</div>

										<div className="fields-row">
											<textarea
												ref="message"
												name="message"
												placeholder="MESSAGE"
											>
											</textarea>
											{
												this.state["error-message"] ?
													<MessageError
														error={this.state["error-message"]}
														messages={config.FORM.ERRORS.message}
													/>
												:
													null
											}
										</div>

										<div className="fields-row">
											<label class="field__label field__label--contact">Newsletter</label>
											<div className="checkbox">
												<input
													id="newsletterCheckbox"
													ref="newsletterCheckbox"
													name="newsletterCheckbox"
													type="checkbox"
													readOnly
												/>
												<label htmlFor="newsletterCheckbox" className="">
													<span className="">
														Receive our latest newsletter
													</span>
												</label>
											</div>
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
											{
												this.state["error"] ?
													<MessageError
														error={this.state["error"]}
														messages={[]}
													/>
												:
													null
											}
										</div>

									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				<FooterMenu />
				<Alert open={this.state.success} message={this.state.message} onSuccess={this.handleAlertSuccess.bind(this)}/>
			</div>
		);
	}
}
