/*----------------------------------------*\
  bitRepublic - footer.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-25 18:10:49
  @Last Modified time: 2018-02-05 17:28:21
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
								<a className="menu__item__link" href={FlowRouter.path("contact")}>Contact</a>
							</li>
							<li className="menu__item">
								<a className="menu__item__link" href="mailto:info@larbitslab.be">info@larbitslab.be</a>
							</li>
							<li className="menu__item">
								<p className="menu__item__text">Licensed under Creative Commons</p>
							</li>
							<li className="menu__item">
								<p className="menu__item__text">SUPPORTED BY</p>
								<ul className="menu menu--footer">
									<li className="menu__item">
										<p className="menu__item__text">Flemish community</p>
									</li>
									<li className="menu__item">
										<p className="menu__item__text">XXXXXXXXXXXXXX</p>
									</li>
								</ul>
							</li>
							<li className="menu__item">
								<p className="menu__item__text">Partners</p>
								<ul className="menu menu--footer">
									<li className="menu__item">
										<a className="menu__item__link" href="mailto:info@larbitslab.be">XXXXXXXXXXXXXX</a>
									</li>
								</ul>
							</li>
						</ul>
					</nav>
				</div>
			</footer>
		);
	}
}
