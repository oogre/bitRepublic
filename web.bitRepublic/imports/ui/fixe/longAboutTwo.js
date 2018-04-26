/*----------------------------------------*\
  bitRepublic - shortAbout.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 18:06:20
  @Last Modified time: 2018-04-26 18:23:41
\*----------------------------------------*/
import React, { Component } from 'react';

// App component - represents the whole app
export default class FixeLongAboutTwo extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div id="shortAbout" className="short-about">
				<div className="container">
					<div className="short-about__col">
						<h3 className="short-about__title">A CAMPAIGN LED BY BOTS</h3>
						<p className="short-about__content">Wondering why this campaign is led by bots? It’s low-cost, but powerful. Out of the hands of governments and corporates into hands of social media users, bots are accessible to most. Bots don’t need sleep or work or look after the kids as real humans do. Carefully designed and managed by humans they perform awesome tasks at a massive scale and reach global audiences in a second. But that’s not the whole story, bots might be prompt to mine bitsoils, while campaigning for you. This is one of the big deals of this campaign. All the bots are equipped with a personal bitsoil-mining counter. A little script that counts and converts each action performed by the bots in bitsoils. All what you have to do is to design your bots.</p>
						<h3 className="short-about__title">TAKE PART OF THE REDISTRIBUTION</h3>
						<p className="short-about__content">On the platform of the campaign, people cannot only mine bitsoils, whilst claiming their fair share, they can also be part of a new model of redistribution of internet wealth. All actions by participants and their bots during the campaign on twitter, serve as raw material for a universal redistribution of wealth mechanism. The total amount of bitsoils redistributed during the campaign can be followed by participants on their personal account as well as the value of bitsoils produced by their bots. On the website, a display shows in real time the distribution of bitsoils to all participants.</p>
					</div>
					<div className="short-about__col">
						<h3 className="short-about__title">FOLLOW THE BOTS</h3>
						<p className="short-about__content">Get minute-by-minute insights and follow the bitsoils mined by your bots on your personal account. The personal account manager shows in real time, from day one of the run up of your tax bots, their evolution: the targets they reach, the amount of bitsoils mined.</p>
					</div>
				</div>
			</div>
		);
	}
}
