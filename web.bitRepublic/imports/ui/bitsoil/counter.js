/*----------------------------------------*\
  bitRepublic - counter.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-29 19:44:39
  @Last Modified time: 2018-02-02 00:08:19
\*----------------------------------------*/
import React, { Component } from 'react';

import * as Utilities from '../../utilities.js'
import { config } from '../../startup/config.js';
import BitsoilSplitter from "./splitter.js";

// BitsoilCounter : LARGE OR NORMAL BITSOIL + TAX COMPONENT
export default class BitsoilCounter extends Component {
	constructor(props){
		super(props);
	}

	render() {
		let bitsoil = Utilities.bitsoilFormat(this.props.bitsoil);
		if(this.props.currencyBefore){
			bitsoil = "$" + bitsoil;
		}else{
			bitsoil = bitsoil + "$";
		}


		let tax = Utilities.bitsoilFormat(this.props.bitsoil * config.TAX_RATE, -2) + "TAX";
		let length = bitsoil.length > tax.length ? bitsoil.length : tax.length;

		return (
			<div className={"counter" + (this.props.large ? "--large " : "")}>
				<BitsoilSplitter unBlock={this.props.unBlock} minLen={length} substitution=" " input={bitsoil}/>

				{ 	this.props.tax ?
						<BitsoilSplitter unBlock={this.props.unBlock} minLen={length} substitution=" " input={tax} />
					:
						null
				}
			</div>
		);
	}
}
