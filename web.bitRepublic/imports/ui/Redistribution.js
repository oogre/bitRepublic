import React, { Component } from 'react';

import HeaderMenu from './menu/header.js';
import SliderMenu from './menu/slider.js';
import FooterMenu from './menu/footer.js';
import RedistriutionMenu from './menu/redistribution.js';
import BitsoilTotalCounter from './bitsoil/totalCounter.js';
import FixeRedistriutionPunchline from './fixe/RedistributionPunchline.js';
import FixeShortAbout from './fixe/shortAbout.js';
import WalletList from './wallet/list.js';
// App component - represents the whole app
export default class Redistribution extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="page">
				<div className="page__content">
					<HeaderMenu />
					<RedistriutionMenu findOutMore={true} />
					<div>
						<p>This is the total amount of bitsoils produced by all the users and their bots during the bitsoil popup hack & tax campaingn.</p>
						<p>Join us and let's make the data economy benefits everyone!</p>
						<BitsoilTotalCounter />
						<FixeRedistriutionPunchline />
						<FixeShortAbout />
						<WalletList />
					</div>
				</div>
				<FooterMenu />
			</div>
		);
	}
}

