import React, { Component } from 'react';

import * as Utilities from '../../utilities.js'
import {config} from '../../startup/config.js';
import BitsoilSplitter from "./splitter.js";

// SMALL BITSOIL COMPONENT
export default class BitsoilDisplay extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div className="container">
				<BitsoilSplitter input={Utilities.bitsoilFormat(this.props.input)}/>
			</div>
		);
  	}
}