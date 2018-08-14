/*----------------------------------------*\
  bitRepublic - counter.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-29 19:44:39
  @Last Modified time: 2018-08-14 10:58:03
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
		let bitsoil = ""+this.props.bitsoil;
		let tax = "";
		let length = 0;
		if(this.props.noFormat !== true){
			bitsoil = Utilities.bitsoilFormat(this.props.bitsoil);
		/*if(this.props.currencyBefore){
			bitsoil = "$" + bitsoil;
		}else{
			bitsoil = bitsoil + "$";
		}*/
		//
			if(this.props.tax){
				tax = Utilities.bitsoilFormat(this.props.bitsoil * config.TAX_RATE);
				while(bitsoil.length < tax.length + 2)bitsoil = "0" + bitsoil;
				tax = "TAX" + tax;
			}else{
				bitsoil = "0" + bitsoil;
			}
		}
		length = bitsoil.length > tax.length ? bitsoil.length : tax.length;
		return (
			<div className={"counter" + (this.props.large ? "--large " : "") + (this.props.type ? "--" + this.props.type + " " : "")}>
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
