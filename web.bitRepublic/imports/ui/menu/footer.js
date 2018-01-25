import React, { Component } from 'react';

// App component - represents the whole app
export default class FooterMenu extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
	    return (
			<div className="container">
				<ul>
					<li>
						<a href="/contact">Contact</a>
					</li>
					<li>
						<a href="#">Supported by</a>
					</li>
					<li>
						<a href="#">Partners</a>
					</li>
					<li>
						<a href="#">Copyright</a>
					</li>
				</ul>
			</div>
		);
  	}
}

