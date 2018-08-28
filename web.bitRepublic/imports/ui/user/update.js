/*----------------------------------------*\
  bitRepublic - update.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 21:22:03
  @Last Modified time: 2018-08-28 16:02:22
\*----------------------------------------*/
import React, { Component } from 'react';

import HeaderMenu from '../menu/header.js';
import FooterMenu from '../menu/footer.js';
import UserMenu from '../menu/user.js';
import UserAvatar from './avatar.js';
import UserForm from './form.js';
import UserPassword from './password.js';
import UserDelete from './delete.js';

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
		return (
			<div className="page page--update">
				<HeaderMenu />
				<div className="page__content">
					<div className="profile__header">
						<div className="container">
							<UserMenu />
						</div>
					</div>
					<div className="container">
						<div className="tabs--profile">
							<ul className="tabs-selector-list">
								<li className="tabs-selector-list__item">
									<a
										className={"tabs-selector-list__button " + (this.state.selectedProcess == "profile" ? "selected" : "")}
										href="#profile"
										onClick={this.handleChangeProcess.bind(this, "profile")}
									>
										user profile
									</a>
								</li>
								<li className="tabs-selector-list__item">
									<a
										className={"tabs-selector-list__button " + (this.state.selectedProcess == "deactivate" ? "selected" : "")}
										href="#deactivate"
										onClick={this.handleChangeProcess.bind(this, "deactivate")}
									>
										deactivate account
									</a>
								</li>
								<li className="tabs-selector-list__item">
									<a
										className={"tabs-selector-list__button " + (this.state.selectedProcess == "password" ? "selected" : "")}
										href="#password"
										onClick={this.handleChangeProcess.bind(this, "password")}
									>
										new password
									</a>
								</li>
							</ul>

							<div className={"tab " + (this.state.selectedProcess == "profile" ? "" : " hidden")}>
								<div className="tab__content">
									<UserAvatar update={true}/>
									<UserForm />
								</div>
							</div>
							<div className={"tab " + (this.state.selectedProcess == "deactivate" ? "" : "hidden")}>
								<div className="tab__content">
									<UserDelete />
								</div>
							</div>
							<div className={"tab " + (this.state.selectedProcess == "password" ? "" : "hidden")}>
								<div className="tab__content">
									<UserPassword />
								</div>
							</div>
						</div>
					</div>
				</div>
				<FooterMenu />
			</div>
		);
	}
}
