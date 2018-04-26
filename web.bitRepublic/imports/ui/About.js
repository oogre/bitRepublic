/*----------------------------------------*\
  bitRepublic - About.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 21:21:06
  @Last Modified time: 2018-04-26 18:23:56
\*----------------------------------------*/
import React, { Component } from 'react';
import HeaderMenu from './menu/header.js';
import SliderMenu from './menu/slider.js';
import FooterMenu from './menu/footer.js';
import FixePunchline from './fixe/punchline.js';
import FixeSlider from './fixe/slider.js';
import FixeLongAboutOne from './fixe/longAboutOne.js';
import FixeLongAboutTwo from './fixe/longAboutTwo.js';
// App component - represents the whole app
export default class About extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="page page--home">
				<HeaderMenu />
				<div className="page__content">
					<SliderMenu />
					<FixeLongAboutOne />
					<FixePunchline description={["design your tax collector bot", "claim a #bitsoiltax"]}>
						<a className="button--secondary hero-banner__button" href={FlowRouter.path("home") + "#taxbot"}>Create now</a>
					</FixePunchline>
					<FixeLongAboutTwo />
					<FixeSlider />
				</div>
				<FooterMenu />
			</div>
		);
	}
}
