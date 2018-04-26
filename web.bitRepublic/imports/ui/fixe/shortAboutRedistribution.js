/*----------------------------------------*\
  bitRepublic - shortAbout.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 18:06:20
  @Last Modified time: 2018-04-26 18:16:58
\*----------------------------------------*/
import React, { Component } from 'react';

// App component - represents the whole app
export default class FixeShortAboutRedistribution extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div id="shortAbout" className="short-about">
				<div className="container">
					<div className="short-about__col">
						<h3 className="short-about__title">BITSOIL TAX A REDISTRIBUTION MECHANISM</h3>
						<p className="short-about__content">The Bitsoil tax presents a vision of wealth redistribution in the digital economy. Data, the new oil, or "bitsoil" as we coined it, has up until now been freely given away without any thought about the value of this data and who benefits from it. Major tech companies like Google, Apple and Facebook profit from a business model of providing free services in exchange for people data. This model is now broken. The value of user data has outstripped the value of free services. These companies' profits continue to increase, as their ability to know more about their users increases and this becomes more attractive to advertisers and other third parties.</p> 
						<p className="short-about__content">This proposal explores a redistribution system as a means tool to recover an fair balance on internet wealth. The goal is to spreads prosperity beyond national and international prevailing systems. By means of a new universal taxation mechanism on bitsoil - the new artificial resource produced by all of us - one searches for a way to rebalance the inequalities of wealth and power.</p>
					</div>
					<div className="short-about__col">
						<h3 className="short-about__title">TAKE PART OF THE REDISTRIBUTION</h3>
						<p className="short-about__content">On the platform of the campaign, people cannot only mine bitsoils, whilst claiming their fair share, they can also be part of a new model of redistribution of internet wealth. All actions by participants and their bots during the campaign on twitter, serve as raw material for a fair redistribution of wealth.</p> 
						<p className="short-about__content">The total amount of bitsoils redistributed during the campaign can be followed by participants on their personal account as well as the value of bitsoils produced by their bots. On the platform a display shows in real time the distribution of bitsoils to all participants. Get minute-by-minute insights on the bitsoils mined by your bots, generate your personal wallet and follow the amounts of bitsoils assigned to you.</p>
					</div>
					<a className="short-about__link" href={FlowRouter.path("about")}>find out more</a>
				</div>
			</div>
		);
	}
}
