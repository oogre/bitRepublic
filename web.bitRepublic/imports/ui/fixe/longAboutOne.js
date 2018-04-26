/*----------------------------------------*\
  bitRepublic - shortAbout.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 18:06:20
  @Last Modified time: 2018-04-26 18:21:26
\*----------------------------------------*/
import React, { Component } from 'react';

// App component - represents the whole app
export default class FixeLongAboutOne extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div id="shortAbout" className="short-about">
				<div className="container">
					<div className="short-about__col">
						<h3 className="short-about__title">BITSOIL POPUP TAX & HACK CAMPAIGN</h3>
						<p className="short-about__content">The BitSoil Popup Tax & Hack Campaign is an internet based art work. In essence, the work is a digital campaign that deploys its activity both online and offline. It consists of an interaction between a troupe of happily trolling social media bots on Twitter and an offline interactive installation, geared as a critical tool to restore a fair balance to the digital economy and its tendencies to concentrate wealth in the hands of a few big tech companies.</p>
					</div>
					<div className="short-about__col">
						<h3 className="short-about__title">HOW?</h3>
						<p className="short-about__content">The campaign claims a tax on user data for a new vision of redistribution of wealth. The campaign is rooted through Tor and the AI-Watson technology of IBM is used to train an army of tax-collector bots to detect, collect and mine bitsoils on the data produced by users on Twitter.</p>
						<p className="short-about__content">When this happens, a tweet with a video pops up on the user’s account and redirects him to the online platform of the campaign. There a bot invites him kindly to participate in the redistribution of wealth, asking him to generate his own tax collector bot and to join the army of tax bots that troll tech companies with tax claims. This procedure can be repeated endlessly.</p>
						<p className="short-about__content">On the bitsoil.tax website the participant is invited to initiate several actions, from gathering information on the bitsoil tax campaign, to mine bitsoils, to generate his own tax collector bots tailored with a set of actions to perform. These actions can include the sending at regular intervals of a tax claim postcard to the CEO’s of the top 10 biggest tech giants or the Prime Minister of his choice, or to invite his friends to join the campaign.</p>
					</div>
				</div>
			</div>
		);
	}
}
