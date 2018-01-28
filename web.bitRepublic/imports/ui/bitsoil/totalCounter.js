import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import * as Utilities from '../../utilities.js'
import { config } from '../../startup/config.js';
import { Wallets } from '../../api/wallets/wallets.js';
import BitsoilSplitter from "./splitter.js";

// BitsoilTotalCounter: LARGE REALTIME TOATL BITSOIL COINTER
class BitsoilTotalCounter extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<div className="container">
				<div>
					<BitsoilSplitter minLen={this.props.length} substitution="0" input={this.props.totalBitsoil}/>
					<BitsoilSplitter minLen={this.props.length} substitution=" " input="bitsoil"/>
				</div>
				<div>
					<BitsoilSplitter minLen={this.props.length} substitution="0" input={this.props.totalTax} />
					<BitsoilSplitter minLen={this.props.length} substitution=" " input="tax" />
				</div>
			</div>
		);
  	}
}

export default withTracker((props) => {
	let totalWallet = Wallets.findOne({ type : config.WALLET_TYPE.PUBLIC, owner : { $exists:false } });
	let totalBitsoil = Utilities.bitsoilFormat(totalWallet ? totalWallet.bitsoil : 0);
	let totalTax = Utilities.bitsoilFormat(totalBitsoil * config.TAX_RATE);
	let length = totalBitsoil.length > totalTax.length ? totalBitsoil.length : totalTax.length;
	return {
		totalBitsoil : totalBitsoil,
		totalTax : totalTax,
		length : length
	};
})(BitsoilTotalCounter);