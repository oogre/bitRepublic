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
