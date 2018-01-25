import React, { Component } from 'react';

// App component - represents the whole app
export default class FooterMenu extends Component {
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
