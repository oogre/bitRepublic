/*----------------------------------------*\
  bitRepublic - App.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 15:13:25
  @Last Modified time: 2018-05-03 00:05:00
\*----------------------------------------*/
import React, { Component } from 'react';

import HeaderMenu from './menu/header.js';
import FooterMenu from './menu/footer.js';
import SliderMenu from './menu/slider.js';
import BotSelector from './bot/selector.js';
import BitsoilTotalCounter from './bitsoil/totalCounter.js';
import FixeShortAbout from './fixe/shortAbout.js';
import FixePunchline from './fixe/punchline.js';
import RedistriutionMenu from './menu/redistribution.js';
import T from '../i18n/index.js';

// App component - represents the whole app
export default class App extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="page page--home">
				<HeaderMenu />
				<div className="page__content">
					<SliderMenu />
					<div className="container">
						<div className="section-intro">
							<p><T>textOverCounter.A</T></p>
							<p><T>textOverCounter.B</T></p>
						</div>
					</div>
					<BitsoilTotalCounter />
					<FixePunchline description={[
						<T>App.FixePunchline.A</T>,
						<T>App.FixePunchline.B</T>,
						<T>App.FixePunchline.C</T>,
					]}/>
					<FixeShortAbout />
					<BotSelector />
					<RedistriutionMenu />
				</div>
				<FooterMenu />
			</div>
		);
		}
}
