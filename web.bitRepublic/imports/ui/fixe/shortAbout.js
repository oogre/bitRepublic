/*----------------------------------------*\
  bitRepublic - shortAbout.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 18:06:20
  @Last Modified time: 2018-04-18 12:20:26
\*----------------------------------------*/
import React, { Component } from 'react';

// App component - represents the whole app
export default class FixeShortAbout extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div id="shortAbout" className="short-about">
				<div className="container">
					<div className="short-about__col">
						<h3 className="short-about__title">the campaign</h3>
						<p className="short-about__content">The Bitsoil Popup Tax & Hack campaign is intended to mobilize users of social media platforms to claim a micro-tax on their data and thereby call for a fair distribution of the wealth of the digital economy. The campaign is led by a band of cheerful trolling social media bots on Twitter. Their goal is to make users aware of the value of their data.</p>
						<h3 className="short-about__title">Create your band of tax bots</h3>
						<p className="short-about__content">On the BitSoil website, participants can create their own troupe of tax collector bots tailored with a set of predefined actions and send them to leaders and influencers of this world as for instance to the CEO’s of the top 10 biggest tech giants or to the Prime Minister of his choice but also to friends.</p>
					</div>
					<div className="short-about__col">
						<h3 className="short-about__title">bitsoil tax</h3>
						<p className="short-about__content">The Bitsoil tax presents a vision of wealth redistribution in the digital economy. In recent years, major tech companies like Google, Apple and Facebook have profited from the business model of providing free services in exchange for user data. This model is now broken. The value of user data has outstripped the value of free services. These companies' profits continue to increase, as their ability to know more about their users increases and this becomes more attractive to advertisers and other third parties. Data, the new oil, or "bitsoil" as we coined it, has up until now been freely given away without any thought about the value of this data and who benefits from it.</p>
					</div>
					<a className="short-about__link" href={FlowRouter.path("about")}>find out more</a>
				</div>
			</div>
		);
	}
}
