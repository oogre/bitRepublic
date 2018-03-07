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
						<div className="grid">
							<div className="column small-3">
								<a className="menu--footer__title" href={FlowRouter.path("contact")}>Contact</a>
								<ul className="menu menu--footer">
									<li className="menu__item">
										<a className="menu__item__link" href="mailto:info@larbitslab.be">info@larbitslab.be</a>
									</li>
								</ul>
							</div>
							<div className="column small-3">
								<p className="menu--footer__title">Supported By</p>
								<ul className="menu menu--footer">
									<li className="menu__item">
										<a className="menu__item__link">Flemish community</a>
									</li>
									<li className="menu__item">
										<a className="menu__item__link">XXXXXXXXXXXXXX</a>
									</li>
								</ul>
							</div>
							<div className="column small-3">
								<p className="menu--footer__title">Partners</p>
								<ul className="menu menu--footer">
									<li className="menu__item">
										<a className="menu__item__link" href="mailto:info@larbitslab.be">XXXXXXXXXXXXXX</a>
									</li>
								</ul>
							</div>
						</div>
					</nav>
					<p className="">Licensed under Creative Commons</p>
				</div>
			</footer>
		);
	}
}
