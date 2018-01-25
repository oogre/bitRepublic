import React, { Component } from 'react';

import HeaderMenu from './menu/header.js';
import SliderMenu from './menu/slider.js';
import FooterMenu from './menu/footer.js';

// App component - represents the whole app
export default class Redistribution extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
	    return (
			<div className="container">
				<HeaderMenu />
				<SliderMenu />
				<FooterMenu />
			</div>
		);
  	}
}

