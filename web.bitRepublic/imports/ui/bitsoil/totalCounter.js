import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Wallets } from '../../api/wallets/wallets.js';
import {config} from '../../startup/config.js';
import BitsoilCounter from './counter.js';

// BitsoilTotalCounter: LARGE REALTIME TOATL BITSOIL COINTER
class BitsoilTotalCounter extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<div className="container">
				<BitsoilCounter bitsoil={this.props.totalBitsoil} />
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