/*----------------------------------------*\
  bitRepublic - pitch.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 16:43:18
  @Last Modified time: 2018-02-02 00:08:15
\*----------------------------------------*/
import React, { Component } from 'react';

// App component - represents the whole app
export default class FixePitch extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="container">
				{
					this.props.title ? 
						<h2>{this.props.title}</h2>
					:
						null
				}
				{
					this.props.description ? 
						this.props.description.map((description, k) => (
							<p key={k}>{description}</p>
						))
					:
						null
				}
			</div>
		);
	}
}
