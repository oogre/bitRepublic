import React, { Component } from 'react';

import HeaderMenu from '../menu/header.js';
import FooterMenu from '../menu/footer.js';
import UserMenu from '../menu/user.js';
import UserAvatar from './avatar.js';
import UserForm from './form.js';

// App component - represents the whole app
export default class UserUpdate extends Component {
	constructor(props){
		super(props);
		
	}
	render() {
		//<HeaderMenu />
		return (
			<div className="page">
				<div className="page__content">
					<UserMenu />
					<UserAvatar update={true}/>
					<UserForm />
					<FooterMenu />
				</div>
			</div>
		);
  	}
}