/*----------------------------------------*\
  bitRepublic - footer.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-25 18:10:49
  @Last Modified time: 2018-02-02 00:08:02
\*----------------------------------------*/
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
