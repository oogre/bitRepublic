import React, { Component } from 'react';

// App component - represents the whole app
export default class FixeWait extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="container" style={{textAlign: "center"}}>
				<img src="/images/loader.gif" />
			</div>
		);
	}
}
