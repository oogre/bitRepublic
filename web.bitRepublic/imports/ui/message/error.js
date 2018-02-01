/*----------------------------------------*\
  bitRepublic - error.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 17:25:21
  @Last Modified time: 2018-02-02 00:08:28
\*----------------------------------------*/
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