import React, { Component } from 'react';

import {config} from '../../startup/config.js';

// BitsoilSplitter : SMALL ANY-STRING SPLITTER COMPONENT
export default class BitsoilSplitter extends Component {
	constructor(props){
		super(props);
	}
	format(input){
		let output = input.split("");
		while((this.props.minLen && output.length < this.props.minLen) || output.length < ("bitsoil").length){
			output.unshift(this.props.substitution ? this.props.substitution : " ");
		}
		return output;
	}
	renderSplitted(input){
		return this.format(input).map((b, k) => (
			<span
				className={this.props.unBlock === b ? "counter__unblock" : "counter__block"}
				key={k}
			>
				<span className="counter__block__text">
					{b}
				</span>
			</span>
		));
	}
	render() {
		return (
			<div className="counter__row">
				{	this.renderSplitted(this.props.input) }
			</div>
		)
	}
}
