import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import MainMenu from './main.js';

// App component - represents the whole app
class FooterMenu extends Component {
	constructor(props){
		super(props);
	}

	render() {
			return (
			<footer className="main-footer">
				<div className="container">
					<nav>
						<ul className="menu menu--footer">
							<li className="menu__item">
								<a className="menu__item__link" href="/contact">Contact</a>
							</li>
							<li className="menu__item">
								<a className="menu__item__link" href="#">Supported by</a>
							</li>
							<li className="menu__item">
								<a className="menu__item__link" href="#">Partners</a>
							</li>
							<li className="menu__item">
								<p className="menu__item__text">Licensed under Creative Commons</p>
							</li>
						</ul>
					</nav>
				</div>
			</footer>
		);
		}
}

export default withTracker(() => {

	return {
		userId : Meteor.userId(),
		currentUser : Meteor.user()
	};
})(FooterMenu);