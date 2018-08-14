/*----------------------------------------*\
	bitRepublic - user.js
	@author Evrard Vincent (vincent@ogre.be)
	@Date:   2018-01-25 18:45:10
	@Last Modified time: 2018-02-02 00:08:13
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import UserLogOut from '../user/logout.js';
// https://reactcommunity.org/react-modal/
import ReactModal from 'react-modal';

ReactModal.setAppElement('body');

class UserMenu extends Component {
	constructor(props){
		super(props);
		this.state = {
			showDropdown: false
		};
		this.toggleDropdown = this.toggleDropdown.bind(this);
	}

	toggleDropdown() {
		this.setState({
			showDropdown: !this.state.showDropdown
		});
	}

	render() {
		return (
			<div>
				<div style={{position: "fixed", top: "0px", left: "0px", width: "100%", height: "100%"}} onClick={this.toggleDropdown} className={(this.state.showDropdown ? "" : " hidden" )}></div>
				<div className="dropdown user-menu">
					<button className="dropdown__button user-menu__button" onClick={this.toggleDropdown}>
						<svg width="40" height="40" id="icon-cog" data-name="icon-cog" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><title>icon-cog</title><path d="M40,24V15.15H34.49a15,15,0,0,0-1.16-2.77L37,8.72,30.71,2.43,27,6.15A15,15,0,0,0,24,5V0H15.15V5.24a15,15,0,0,0-2.88,1.32L8.72,3,2.43,9.29l3.86,3.86a14.93,14.93,0,0,0-1,2.82H0v8.89H5.78A15.12,15.12,0,0,0,7,27.32l-4,4,6.29,6.29,4.26-4.26A14.93,14.93,0,0,0,16,34.2V40h8.89V34a15,15,0,0,0,2.36-1L31.28,37l6.29-6.29-4.13-4.13a15,15,0,0,0,1-2.55ZM20,27.72A7.72,7.72,0,1,1,27.72,20,7.73,7.73,0,0,1,20,27.72Z"/></svg>
						<span className="sr-only">User Menu</span>
					</button>

					<div className={"dropdown__content" + (this.state.showDropdown ? "" : " hidden" )}>
						<ul className="dropdown__list">
							<li className="dropdown__item__item">
								<a className="dropdown__item__link" href={FlowRouter.path("userProfile", {username : this.props.username})}>Bot info</a>
							</li>
							<li className="dropdown__item__item">
								<a className="dropdown__item__link" href={FlowRouter.path("userUpdate", {username : this.props.username})}>Settings</a>
							</li>
							<li className="dropdown__item__item">
								<UserLogOut/>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default withTracker(() => {
	let currentUser = Meteor.user();
	let username = currentUser ? currentUser.username : null;
	let userId = currentUser ? currentUser._id : null;
	return {
		userId : userId,
		currentUser : currentUser,
		username : username
	};
})(UserMenu);
