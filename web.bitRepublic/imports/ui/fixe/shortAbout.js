/*----------------------------------------*\
  bitRepublic - shortAbout.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 18:06:20
  @Last Modified time: 2018-10-20 12:26:38
\*----------------------------------------*/
import React, { Component } from 'react';
import T from './../../i18n/index.js';

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
						<h3 className="short-about__title"><T>App.about.A.title</T></h3>
						<p className="short-about__content"><T>App.about.A.content</T></p>
						<h3 className="short-about__title"><T>App.about.B.title</T></h3>
						<p className="short-about__content"><T>App.about.B.content</T></p>
					</div>
					<div className="short-about__col">
						<h3 className="short-about__title"><T>App.about.C.title</T></h3>
						<p className="short-about__content"><T>App.about.C.content</T></p>
					</div>
					<a className="short-about__link" href={FlowRouter.path("about")}><T>Menu.more</T></a>
				</div>
			</div>
		);
	}
}
