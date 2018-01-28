import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';


// App component - represents the whole app
class UserForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			firstname: this.props.firstname,
			lastname : this.props.lastname,
			username : this.props.username,
			email : this.props.email
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
		const firstname = this.state.firstname.trim();
		const lastname = this.state.lastname.trim();
		const username = this.state.username.trim();
		const email = this.state.email.trim();
		Meteor.call("users.update", {
			username : username,
			profile : {
				firstname : firstname,
				lastname : lastname
			},
			emails : [{
				address : email
			}]
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
			<div className="container">
				<form onSubmit={this.handleSubmit.bind(this)}>
					<label>
						firstname
						<input
							type="text"
							ref="firstname"
							name="firstname"
							value={this.state.firstname}
							onChange={this.handleOnChange.bind(this)}
						/>
					</label>
					<label>
						lastname
						<input
							type="text"
							ref="lastname"
							name="lastname"
							value={this.state.lastname}
							onChange={this.handleOnChange.bind(this)}
						/>
					</label>
					<label>
						username
						<input
							type="text"
							ref="username"
							name="username"
							value={this.state.username}
							onChange={this.handleOnChange.bind(this)}
						/>
					</label>
					<label>
						email
						<input
							type="email"
							ref="email"
							name="email"
							value={this.state.email}
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
export default withTracker(() => {
	let currentUser = Meteor.user();
	let username = currentUser ? currentUser.username : "";
	let firstname = currentUser ? currentUser.profile.firstname : "";
	let lastname = currentUser ? currentUser.profile.lastname : "";
	let email = currentUser ? currentUser.emails[0].address : "";
	let userId = currentUser ? currentUser._id : null;
	
	return {
		userId : userId,
		currentUser : currentUser,
		firstname : firstname,
		lastname : lastname,
		username : username,
		email : email
	};
})(UserForm);