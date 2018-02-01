/*----------------------------------------*\
  bitRepublic - About.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 21:21:06
  @Last Modified time: 2018-02-02 00:08:34
\*----------------------------------------*/
import React, { Component } from 'react';
import HeaderMenu from './menu/header.js';
import SliderMenu from './menu/slider.js';
import FooterMenu from './menu/footer.js';

// App component - represents the whole app
export default class About extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="page">
				<div className="page__content">
					<HeaderMenu />
					<SliderMenu />
				</div>
				<FooterMenu />
			</div>
		);
	}
}
