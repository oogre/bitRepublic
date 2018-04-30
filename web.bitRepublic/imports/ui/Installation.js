/*----------------------------------------*\
  bitRepublic - Installation.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 20:35:46
  @Last Modified time: 2018-04-30 14:37:52
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
				<HeaderMenu />
				<div className="page__content">
					<MenuMenu
						title="enter the republic"
						description={[
							"Follow Live the redistribution of bitsoils",
						]}
					>
						<li className="buttons-list__item">
							<a className="button button--md hero-banner__button" href={FlowRouter.path("home") + "#taxbot"}>Join the campaign</a>
						</li>
						<li className="buttons-list__item">
							<a className="button button--md hero-banner__button" href={FlowRouter.path("about")}>FIND OUT MORE</a>
						</li>
					</MenuMenu>
					<FixeInfo />

					<FixePunchline description={[
						"BITSOIL IS THE NEW OIL OF THE DIGITAL ECONOMY",
						"CLAIM YOUR FAIR SHARE OF THIS WORLD’S NEWEST RESOURCE"
					]}>
						<a className="button--secondary hero-banner__button" href={FlowRouter.path("home") + "#taxbot"}>DESIGN YOUR TAXBOT</a>
					</FixePunchline>
					<div className="offset-grid offset-grid--installation">
						<div className="offset-grid__wrapper container">
							<div className="offset-grid__col text-center">
								<FixePitch title="WATCH THE TRAILER!"
									description={[
										"Launch of the campaign the17th of May. Join us!"
									]}
								/>
							</div>
							<div className="offset-grid__col text-center">
								<FixeGallery />
							</div>
						</div>
					</div>
					<FixeSlider />
				</div>
				<FooterMenu />
			</div>
		);
	}
}

