/*----------------------------------------*\
  bitRepublic - shortAbout.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 18:06:20
  @Last Modified time: 2018-05-03 02:05:40
\*----------------------------------------*/
import React, { Component } from 'react';
import T from './../../i18n/index.js';

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
						<h3 className="short-about__title"><T>About.A.title</T></h3>
						<p className="short-about__content"><T>About.A.content</T></p>
						<h3 className="short-about__title"><T>About.B.title</T></h3>
						<p className="short-about__content"><T>About.B.content.A</T></p>
					</div>
					<div className="short-about__col">
						<p className="short-about__content"><T>About.B.content.B</T></p>
						<p className="short-about__content"><T>About.B.content.C</T></p>
					</div>
				</div>
			</div>
		);
	}
}
