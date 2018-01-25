import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class SliderMenu extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
	    return (
			<div className="container">
				<h2>
					Make the data economy benefits all
				</h2>
				<ul>
					<li>
						<a href="#">Design your taxbot</a>
					</li>
					<li>
						<a href="#">Find out more</a>
					</li>
				</ul>
			</div>
		);
  	}
}