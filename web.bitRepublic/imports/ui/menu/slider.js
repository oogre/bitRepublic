/*----------------------------------------*\
  bitRepublic - slider.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 15:13:25
  @Last Modified time: 2018-10-21 14:25:31
\*----------------------------------------*/
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import BitsoilTaxrate from '../bitsoil/taxrate.js';
import T from './../../i18n/index.js';


export default class SliderMenu extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="hero-banner hero-banner--bitsoil">
				<div className="container">
					<BitsoilTaxrate />
					<div className="hero-banner__content">
						<h2 className="hero-banner__title"><T>SliderMenu.banner__title</T></h2>
						<ul className="buttons-list buttons-list--bitsoil">
							<li className="buttons-list__item">
								<a className="button button--md hero-banner__button" href={FlowRouter.path("home") + "#taxbot"}><T>Menu.designYourTaxbot</T></a>
							</li>
							<li className="buttons-list__item">
								<a className="button button--md hero-banner__button" href={FlowRouter.path("about") + "#shortAbout"}><T>Menu.findOutMore</T></a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
