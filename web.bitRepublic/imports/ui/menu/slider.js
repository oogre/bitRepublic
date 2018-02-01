/*----------------------------------------*\
  bitRepublic - slider.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 15:13:25
  @Last Modified time: 2018-02-02 00:08:06
\*----------------------------------------*/
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import BitsoilTaxrate from '../bitsoil/taxrate.js';


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
						<h2 className="hero-banner__title">Make the data economy benefits all</h2>
						<ul className="buttons-list">
							<li className="buttons-list__item">
								<a className="button button--md hero-banner__button" href={FlowRouter.path("home") + "#taxbot"}>Design your taxbot</a>
							</li>
							<li className="buttons-list__item">
								<a className="button button--md hero-banner__button" href={FlowRouter.path("home") + "#shortAbout"}>Find out more</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
