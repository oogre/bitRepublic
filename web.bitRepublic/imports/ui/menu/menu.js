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
