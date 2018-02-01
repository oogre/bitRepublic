/*----------------------------------------*\
  bitRepublic - Installation.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 20:35:46
  @Last Modified time: 2018-02-02 00:08:35
\*----------------------------------------*/
import React, { Component } from 'react';

import HeaderMenu from './menu/header.js';
import SliderMenu from './menu/slider.js';
import FooterMenu from './menu/footer.js';
import MenuMenu from './menu/menu.js';
import FixePitch from './fixe/pitch.js';
import FixePunchline from './fixe/punchline.js';
import FixeGallery from './fixe/gallery.js';
import FixeInfo from './fixe/info.js';
import FixeSlider from './fixe/slider.js';
// App component - represents the whole app
export default class Installation extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="page">
				<div className="page__content">
					<HeaderMenu />
					<MenuMenu 
						title="enter the republic" 
						description={[
							"PITCH of the installation",
							"A few words about bitSOIL resource and installation"
						]}
					>
						<a className="button button--md hero-banner__button" href={FlowRouter.path("redistribution")}>Join the campaign</a>
						<a className="button button--md hero-banner__button" href={FlowRouter.path("home") + "#taxbot"}>Create your taxbot</a>
					</MenuMenu>
					<div>
						<FixePitch 	title="enter the republic" 
									description={[
										"pitch pistch dsfjhsdlkfj sdkjfh lkfjha lskjfhlkjdsh alkjjshf alkjjhfs lkajshf kjh"
									]}
						/>
						<FixeGallery />
					</div>
					<div>

					</div>
					<FixePunchline description={["design your tax collector bot", "claim a #bitsoiltax"]}>
						<a className="button button--md hero-banner__button" href={FlowRouter.path("home") + "#taxbot"}>Create now</a>
					</FixePunchline>
					<FixeInfo />
					<FixeSlider />
				</div>
				<FooterMenu />
			</div>
		);
	}
}

