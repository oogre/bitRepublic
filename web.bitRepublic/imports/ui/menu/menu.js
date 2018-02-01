/*----------------------------------------*\
  bitRepublic - menu.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 18:41:48
  @Last Modified time: 2018-02-02 00:08:08
\*----------------------------------------*/
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class MenuMenu extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="hero-banner">
				<div className="container">
					<div className="hero-banner__content">
						<h2 className="hero-banner__title">
							{this.props.title}
						</h2>
						{
							this.props.description.map((description, k) => (
								<p key={k}>{description}</p>
							))
						}
						<ul className="buttons-list">
							{this.props.children}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
