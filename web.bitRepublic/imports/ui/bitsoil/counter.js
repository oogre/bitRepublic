import React, { Component } from 'react';

import * as Utilities from '../../utilities.js'
import {config} from '../../startup/config.js';
import BitsoilDisplay from "./display.js";

// SMALL BITSOIL + TAX COMPONENT
export default class BitsoilCounter extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="container">
				<div>
					<BitsoilDisplay input={this.props.bitsoil} />
				</div>
				<div>
					<BitsoilDisplay input={this.props.bitsoil * config.TAX_RATE} />
				</div>
			</div>
		);
  	}
}