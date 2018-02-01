import React, { Component } from 'react';

// App component - represents the whole app
export default class FixePitch extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="pitch">
				{
					this.props.title ?
						<h2 className="pitch__title">{this.props.title}</h2>
					:
						null
				}
				{
					this.props.description ?
						this.props.description.map((description, k) => (
							<p className="pitch__description" key={k}>{description}</p>
						))
					:
						null
				}
			</div>
		);
	}
}
