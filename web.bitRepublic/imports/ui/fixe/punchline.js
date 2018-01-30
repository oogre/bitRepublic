import React, { Component } from 'react';

// App component - represents the whole app
export default class FixePunchline extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="punchline">
				<div className="container">
					<p>over &euro; 1 billion in lost taxes on people's browsing activity.</p>
					<p>bitsoil the new oil of the digital economy.</p>
					<p>time to claim your share.</p>
				</div>
			</div>
		);
	}
}
