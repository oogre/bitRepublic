import React, { Component } from 'react';

import * as Utilities from '../../utilities.js'
import {config} from '../../startup/config.js';

// BitSoilsCounter component - represents the bitsoil counter utility
export default class BitsoilCounter extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<div className="container">
				<div>
					{Utilities.numberFormat(this.props.bitsoil)}
				</div>
				<div>
					{Utilities.numberFormat(this.props.bitsoil * config.TAX_RATE)}
				</div>
			</div>
		);
  	}
}