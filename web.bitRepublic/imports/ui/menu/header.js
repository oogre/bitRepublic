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
						<a href="/">
							<img src="/images/logo.png" alt="#Bitsoil Tax"/>
						</a>
					</h1>
					<MainMenu />
				</div>
			</header>
		);
	}
}