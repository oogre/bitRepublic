/*----------------------------------------*\
  bitRepublic - taxrate.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 18:34:33
  @Last Modified time: 2018-02-02 00:08:20
\*----------------------------------------*/
import React, { Component } from 'react';

import {config} from '../../startup/config.js';
import BitsoilSplitter from "./splitter.js";
// App component - represents the whole app
export default class BitsoilTaxrate extends Component {
	constructor(props){
		super(props);
	}


	render() {
		return (
			<div className="taxrate">
				<div className="counter--tax">
					<div className="counter--tax__row">
						{config.TAX_RATE}
					</div>
					<BitsoilSplitter input="TAX" size="TAX"/>
				</div>
			</div>
		);
		}
}
