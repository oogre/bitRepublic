import React, { Component } from 'react';

import HeaderMenu from './menu/header.js';
import FooterMenu from './menu/footer.js';
import SliderMenu from './menu/slider.js';
import BotSelector from './bot/selector.js';
import BitsoilTotalCounter from './bitsoil/totalCounter.js';


// App component - represents the whole app
export default class App extends Component {
	constructor(props){
		super(props);
	}


	render() {
		return (
			<div className="page">
				<div className="page__content">
					<HeaderMenu />
					<SliderMenu />
					<BitsoilTotalCounter />
					<BotSelector />
				</div>
				<FooterMenu />
			</div>
		);
		}
}
