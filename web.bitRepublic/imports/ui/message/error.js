import React, { Component } from 'react';

export default class MessageError extends Component {
	constructor(props){
		super(props);
	}
	renderError(message){

	}
	render() {
		return (
			<div className="message error-message">
				{this.props.messages[this.props.error] ? this.props.messages[this.props.error] : this.props.error}
			</div>
		);
	}
}