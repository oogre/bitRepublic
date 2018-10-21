/*----------------------------------------*\
  bitRepublic - shortAbout.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 18:06:20
  @Last Modified time: 2018-10-20 12:27:12
\*----------------------------------------*/
import React, { Component } from 'react';
import T from './../../i18n/index.js';
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
						<h3 className="short-about__title"><T>Redistribution.about.A.title</T></h3>
						<p className="short-about__content"><T>Redistribution.about.A.content.A</T></p> 
						<p className="short-about__content"><T>Redistribution.about.A.content.B</T></p>
					</div>
					<div className="short-about__col">
						<h3 className="short-about__title"><T>Redistribution.about.B.title</T></h3>
						<p className="short-about__content"><T>Redistribution.about.B.content.A</T></p> 
						<p className="short-about__content"><T>Redistribution.about.B.content.B</T></p>
						<p className="short-about__content"><T>Redistribution.about.B.content.C</T></p>
					</div>
					<a className="short-about__link" href={FlowRouter.path("about")}><T>Menu.more</T></a>
				</div>
			</div>
		);
	}
}
