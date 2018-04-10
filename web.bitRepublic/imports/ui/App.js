/*----------------------------------------*\
  bitRepublic - App.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 15:13:25
  @Last Modified time: 2018-03-21 17:35:15
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
					<BitsoilTotalCounter />
					<FixePunchline description={[
						"over € 1 billion in lost taxes on people's browsing activity.",
						"bitsoil the new oil of the digital economy.",
						"time to claim your share."
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
