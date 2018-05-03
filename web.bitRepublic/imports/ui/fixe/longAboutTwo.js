/*----------------------------------------*\
  bitRepublic - shortAbout.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 18:06:20
  @Last Modified time: 2018-05-03 02:04:10
\*----------------------------------------*/
import React, { Component } from 'react';
import T from './../../i18n/index.js';

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
						<h3 className="short-about__title"><T>About.C.title</T></h3>
						<p className="short-about__content"><T>About.C.content.A</T></p>
						<p className="short-about__content"><T>About.C.content.B</T></p>
						
						<h3 className="short-about__title"><T>About.E.title</T></h3>
						<p className="short-about__content"><T>About.E.content</T></p>
					</div>
					<div className="short-about__col">
						<h3 className="short-about__title"><T>About.D.title</T></h3>
						<p className="short-about__content"><T>About.D.content.A</T></p>
						<p className="short-about__content"><T>About.D.content.B</T></p>
					</div>
				</div>
			</div>
		);
	}
}
