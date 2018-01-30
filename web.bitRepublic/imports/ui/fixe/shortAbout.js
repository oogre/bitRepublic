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
						<h3 className="short-about__title">the campain</h3>
						<p className="short-about__content">The Bitsoil Tax campaign aims to mobilize users of social media platforms and other tech tools
							to claim a microtax on their data and therein make a call for fair distribution of the wealth
							of the digital economy. The campaign consists of a band tax-collector bots on Twitter which sensibilize Twitter users about the value of their data.
						</p>
					</div>
					<div className="short-about__col">
						<h3 className="short-about__title">bitsoil tax</h3>
						<p className="short-about__content">The Bitsoiltax presents a vision of wealth redistribution in the digital economy. In the recent years, major tech companies like Google, Apple, and Facebook have profited from the buisiness model of providing free services in exchange for user data. This model is now broken. The value of user data has outstripped the value of free services. These companies' profits continue to increase, as their ability to know more about their users increase and this becomes more attractive
							to advertisers and other thrid parties. Data, the new oil, or "bitsoil" as this projet names it, has up until now been freely given away without any thought to the value of this
							data and who benefits from it.</p>
						<a className="short-about__link" href={FlowRouter.path("about")}>find out more</a>
					</div>
				</div>
			</div>
		);
	}
}
