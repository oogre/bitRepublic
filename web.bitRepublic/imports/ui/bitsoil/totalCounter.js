/*----------------------------------------*\
  bitRepublic - totalCounter.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 00:34:11
  @Last Modified time: 2018-02-20 12:31:08
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import * as Utilities from '../../utilities.js'
import { config } from '../../startup/config.js';

import { Wallets } from '../../api/wallets/wallets.js';

import BitsoilSplitter from "./splitter.js";
import FixeWait from '../fixe/wait.js';

// BitsoilTotalCounter: LARGE REALTIME TOATL BITSOIL COINTER
class BitsoilTotalCounter extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="total-counter container">
				{
					this.props.isReady ?
						<div>
							<div className="counter--xl">
								<div className="counter__prefix">
									<svg className="artwork-bitsoil-symbol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63.84 98.38"><title>Bitsoil Symbol</title><polygon points="63.84 17.26 63.84 81.13 44.65 81.13 44.65 98.38 38.27 98.38 38.27 81.13 25.66 81.13 25.66 98.38 19.28 98.38 19.28 81.13 0 81.13 0 74.75 57.45 74.75 57.45 23.64 6.38 23.64 6.38 62.1 44.65 62.1 44.65 52.48 12.77 52.48 12.77 30.14 51.07 30.14 51.07 36.52 19.15 36.52 19.15 46.1 51.07 46.1 51.07 52.48 51.04 52.48 51.04 62.1 51.07 62.1 51.07 68.48 0 68.48 0 17.26 19.14 17.26 19.14 0 25.52 0 25.52 17.26 38.27 17.26 38.27 0 44.65 0 44.65 17.26 63.84 17.26" fill="#fffcfb"/></svg>
								</div>

								<div className="counter__content">
									<BitsoilSplitter minLen={this.props.length} substitution="0" input={this.props.totalBitsoil}/>
									<BitsoilSplitter minLen={this.props.length} substitution=" " input="bitsoil"/>
								</div>
							</div>

							<div className="counter--xl">
								<img className="artwork-tax-logo" src="/images/hand-purse-animated-with-bg.gif" alt=""/>

								<div className="counter__content">
									<BitsoilSplitter minLen={this.props.length} substitution="0" input={this.props.totalTax} />
									<BitsoilSplitter minLen={this.props.length} substitution=" " input="tax" />
								</div>
							</div>
						</div>
					:
						<FixeWait />
				}
			</div>
		);
	}
}

export default withTracker((props) => {
	let publicWalletReady = FlowRouter.subsReady("public.wallet");

	let bitsoil = 0;
	if(publicWalletReady){
		bitsoil = Wallets.findOne({ type : config.WALLET_TYPE.PUBLIC, owner : { $exists:false } }, {fields : {bitsoil : 1}}).bitsoil;
	}
	let formatBitsoil = Utilities.bitsoilFormat(bitsoil);
	let formatTax = Utilities.bitsoilFormat(bitsoil * config.TAX_RATE);

	return {
		isReady : publicWalletReady,
		totalBitsoil : formatBitsoil,
		totalTax : formatTax,
		length : Math.max(formatBitsoil.length,  formatTax.length)
	};
})(BitsoilTotalCounter);
