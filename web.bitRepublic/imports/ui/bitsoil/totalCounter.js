import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Wallets } from '../../api/wallets/wallets.js';
import * as Utilities from '../../utilities.js'
import {config} from '../../startup/config.js';

// BitSoilsCounter component - represents the bitsoil counter utility
class BitsoilTotalCounter extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<div className="container">
				<div>
					{Utilities.numberFormat(this.props.totalBitsoil)}
				</div>
				<div>
					{Utilities.numberFormat(this.props.totalBitsoil * config.TAX_RATE)}
				</div>
			</div>
		);
  	}
}

export default withTracker((props) => {
	let totalWallet = Wallets.findOne({ type : 0, owner : { $exists:false } });
	let totalBitsoil = totalWallet ? totalWallet.bitsoil : 0;
	return {
		totalBitsoil : totalBitsoil
	};
})(BitsoilTotalCounter);