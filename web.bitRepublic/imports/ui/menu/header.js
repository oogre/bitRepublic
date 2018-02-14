/*----------------------------------------*\
  bitRepublic - header.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 23:42:39
  @Last Modified time: 2018-02-13 13:23:15
\*----------------------------------------*/
import React, { Component } from 'react';
import MainMenu from './main.js';

// App component - represents the whole app
export default class HeaderMenu extends Component {
	constructor(props){
		super(props);
	}

	render() {
			return (
			<header className="main-header">
				<div className="container">
					<h1 className="logo logo--header">
						<a href={FlowRouter.path("home")}>
							<img className="logo--header__picture" src="/images/logo-animated.gif" alt="#Bitsoil Tax"/>
						</a>
					</h1>
					<MainMenu />
				</div>
			</header>
		);
	}
}
