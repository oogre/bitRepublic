import React, { Component } from 'react';

import HeaderMenu from '../menu/header.js';
import FooterMenu from '../menu/footer.js';
import UserMenu from '../menu/user.js';
import UserAvatar from './avatar.js';
import UserForm from './form.js';
import UserPassword from './password.js';

// App component - represents the whole app
export default class UserUpdate extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedProcess : FlowRouter.current().context.hash || "profile"
		};
	}
	handleChangeProcess(selectedProcess){
		this.setState({ selectedProcess: selectedProcess })
	}
	render() {

		//<HeaderMenu />
		//
		return (
			<div className="page">
				<div className="page__content">
					<UserMenu />
					<ul>
						<li>
							<a 
								href="#profile" 
								onClick={this.handleChangeProcess.bind(this, "profile")}
							>
								user profile
							</a>
						</li>
						<li>
							<a 
								href="#password" 
								onClick={this.handleChangeProcess.bind(this, "password")}
							>
								new password
							</a>
						</li>
					</ul>
					<div className={this.state.selectedProcess == "profile" ? "" : "hidden"}>
						<UserAvatar update={true}/>
						<UserForm />
					</div>
					<div className={this.state.selectedProcess == "password" ? "" : "hidden"}>
						<UserPassword />
					</div>
					<FooterMenu />
				</div>
			</div>
		);
  	}
}