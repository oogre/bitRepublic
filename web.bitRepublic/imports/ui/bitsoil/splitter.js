import React, { Component } from 'react';

import * as Utilities from '../../utilities.js'
import {config} from '../../startup/config.js';

// BitsoilSplitter : SMALL ANY-STRING SPLITTER COMPONENT
export default class BitsoilSplitter extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return this.props.input.split("").map((b, k) => (
			<span key={k}>
				{b}
			</span>
		));
  	}
}