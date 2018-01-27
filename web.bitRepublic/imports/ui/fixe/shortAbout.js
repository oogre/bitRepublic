import React, { Component } from 'react';

// App component - represents the whole app
export default class FixeShortAbout extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
	    return (
			<div id="shortAbout" className="container">
				<div>
					<h3>the campain</h3>
					<div>
						The Bitsoil Tax campaign aims to mobilize users 
						of social media platforms and other tech tools 
						to claim a microtax on their data and therein 
						make a call for fair distribution of the wealth
						of the digital economy.
						The campaign consists of a band tax-collector 
						bots on Twitter which sensibilize Twitter users 
						about the value of their data.
					</div>
				</div>
				<div>
					<h3>bitsoil tax</h3>
					<div>
						The Bitsoiltax presents a vision of wealth redistribution 
						in the digital economy. In the recent years, 
						major tech companies like Google, Apple, and Facebook
						have profited from the buisiness model of providing free
						services in exchange for user data. This model is now broken.
						The value of user data has outstripped the value of free services.
						These companies' profits continue to increase, as their ability to 
						know more about their users increase and this becomes more attractive
						to advertisers and other thrid parties.
						Data, the new oil, or "bitsoil" as this projet names it, has up until
						now been freely given away without any thought to the value of this
						data and who benefits from it.
					</div>
					<a href={FlowRouter.path("about")}>find out more</a>
				</div>
			</div>
		);
  	}
}