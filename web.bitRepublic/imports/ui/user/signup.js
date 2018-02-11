/*----------------------------------------*\
  bitRepublic - signup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 19:46:12
  @Last Modified time: 2018-02-08 13:21:44
\*----------------------------------------*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { CreateUser } from '../../api/users/methods.js';
import { config } from '../../startup/config.js';

import { Targets } from '../../api/targets/targets.js';

import MessageError from '../message/error.js';
import FixeWait from '../fixe/wait.js';

class UserSignup extends Component {
	constructor(props){
		super(props);
		this.state = {
			'error' : false,
			'error-firstname' : false,
			'error-lastname' : false,
			'error-email' : false,
			'error-country' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false,
			selectedOption : ''
		};
	}

	handleSignup(event){
		event.preventDefault();
		this.setState({
			'error' : false,
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
			country : this.state.selectedOption.value
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
			if(err){
				this.setState({'has-error' : true});
				this.setState({
					["error"] : err.message
				});
				return;
			}
			this.setState({'has-success' : true});
			ReactDom.findDOMNode(this.refs.firstname).value = '';
			ReactDom.findDOMNode(this.refs.lastname).value = '';
			ReactDom.findDOMNode(this.refs.email).value = '';
			this.setState({ selectedOption : ''});

			alert(res.message);
			if(_.isFunction(this.props.onSuccess)){
				this.props.onSuccess(res.data);
			}
		});
	}
	handleChangeCountry(selectedOption){
		this.setState({ selectedOption : selectedOption});
	}
	render() {
		const { selectedOption } = this.state;
  		const value = selectedOption && selectedOption.value;
		return (
			<div className={(this.props.visible ? "" : "hidden")}>
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
						<div className="fields-column">
							<Select
								name="countries"
								value={value}
								options={this.props.countries}
								onChange={this.handleChangeCountry.bind(this)}
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
					{this.state['is-loading'] ? <FixeWait /> : null }
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
						{ this.state["error"] ? <MessageError error={this.state["error"]} messages={[]} /> : null }
					</div>
				</form>
			</div>
		);
	}
}
export default withTracker(() => {
	let targetsReady = FlowRouter.subsReady("targets");
	let isReady = targetsReady;
	let countries = [];
	if(isReady){
		countries = Targets.find({}, {fields : {name : 1}}).fetch().map((target)=>{
			return {
				value : target._id,
				label : target.name
			}
		});
	}
	return {
		countries : countries,
		isReady : isReady
	};
})(UserSignup);
/*
<input
								type="text"
								ref="country"
								name="country"
								placeholder="your country"
							/>
*/
