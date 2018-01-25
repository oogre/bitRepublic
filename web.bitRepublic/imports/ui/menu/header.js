import React, { Component } from 'react';
import MainMenu from './main.js';

// App component - represents the whole app
export default class HeaderMenu extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
	    return (
			<div className="container">
				<header>
					<h1>
						<a href="/">
							<span>#BITSOIL</span>
							<span>TAX</span>
						</a>
					</h1>
					<MainMenu />
				</header>
			</div>
		);
  	}
}