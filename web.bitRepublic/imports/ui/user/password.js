import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { config } from '../../startup/config.js';
import { Users } from '../../api/users/users.js';

// App component - represents the whole app
export default class UserPassword extends Component {
	constructor(props){
		super(props);
		this.state = {
			oldpassword: this.props.oldpwd,
			newpassword : this.props.newpwd,
			newpwdcheck : this.props.newpwdcheck
		};
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			oldpassword: nextProps.oldpwd,
			newpassword : nextProps.newpwd,
			newpwdcheck : nextProps.newpwdcheck
		});
	}
	handleOnChange(e){
		this.setState({[e.target.name]: e.target.value})
	}
	handleSubmit(event){
		event.preventDefault();
		const oldPassword = this.state.oldpassword;
		const newPassword = this.state.newpassword;
		const newpwdcheck = this.state.newpwdcheck;

		if(newpwdcheck !== newPassword){
			throw new Meteor.Error("validation-error", 'Passwords missmatch');
		}
		if(newPassword.length < config.PWD_LENGTH.MIN){
			throw new Meteor.Error("validation-error", 'Passwords too short : minimum '+config.MIN_PWD_LENGTH+' characters');
		}
		if(newPassword.length > config.PWD_LENGTH.MAX){
			throw new Meteor.Error("validation-error", 'Passwords too long : maximum '+config.PWD_LENGTH.MAX+' characters');
		}

		Meteor.call("users.update.pwd", {
			oldPassword : oldPassword,
			newPassword : newPassword
		}, function(err, res){
			if(err){
				console.log(err);
				return ;
			}
			console.log(res);
		});
		
	}
	handleOnChange(e){
		this.setState({[e.target.name]: e.target.value})
	}
	render() {
		//<HeaderMenu />
		return (
			<div className={"container"+ " " + (this.props.visible ? "" : "hidden")}>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<label>
						<input
							type="password"
							ref="oldpassword"
							name="oldpassword"
							placeholder="old password"
							onChange={this.handleOnChange.bind(this)}
						/>
					</label>
					<label>
						<input
							type="password"
							ref="newpassword"
							name="newpassword"
							placeholder="new password"
							onChange={this.handleOnChange.bind(this)}
						/>
					</label>
					<label>
						<input
							type="password"
							ref="newpwdcheck"
							name="newpwdcheck"
							placeholder="new password again"
							onChange={this.handleOnChange.bind(this)}
						/>
					</label>
					<input 
						type="submit"
						value="save" 
						className="button--primary button--submit"
					/>
				</form> 		
			</div>
		);
  	}
}