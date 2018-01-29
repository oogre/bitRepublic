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
			<div className="total-counter container">

				<div className="counter--xl">
					<div className="counter__prefix">
						<svg width="64px" height="98px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63.84 98.38"><title>Bitsoil Symbol</title><polygon points="63.84 17.26 63.84 81.13 44.65 81.13 44.65 98.38 38.27 98.38 38.27 81.13 25.66 81.13 25.66 98.38 19.28 98.38 19.28 81.13 0 81.13 0 74.75 57.45 74.75 57.45 23.64 6.38 23.64 6.38 62.1 44.65 62.1 44.65 52.48 12.77 52.48 12.77 30.14 51.07 30.14 51.07 36.52 19.15 36.52 19.15 46.1 51.07 46.1 51.07 52.48 51.04 52.48 51.04 62.1 51.07 62.1 51.07 68.48 0 68.48 0 17.26 19.14 17.26 19.14 0 25.52 0 25.52 17.26 38.27 17.26 38.27 0 44.65 0 44.65 17.26 63.84 17.26" fill="#fffcfb"/></svg>
					</div>

					<div className="counter__content">
						<BitsoilSplitter minLen={this.props.length} substitution="0" input={this.props.totalBitsoil}/>
						<BitsoilSplitter minLen={this.props.length} substitution=" " input="bitsoil"/>
					</div>
				</div>

				<div className="counter--xl">
					<div className="counter__prefix">
						<svg width="97px" height="81px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92.65 77.48"><title>Tax Logo</title><rect x="27.05" y="24.61" width="30.28" height="26.91" fill="#f4c9a2"/><path d="M63.84,26.08H82.13a4.42,4.42,0,0,1,4.42,4.42v0a4.42,4.42,0,0,1-4.42,4.42H63.84a0,0,0,0,1,0,0V26.08A0,0,0,0,1,63.84,26.08Z" fill="#f4c9a2"/><path d="M60.81,13.71,56.17,2.17,65.35,1s.2,6.78.78,6.13A14,14,0,0,1,69,5.37L71.36,7.9,81.21,0,75.94,16.94l-13.81.27Z" fill="#e09f36"/><rect x="53.09" y="17.2" width="32.54" height="8.92" rx="4.46" ry="4.46" fill="#f4c9a2" stroke="#c96c47" strokeMiterlimit="10" strokeWidth="1.47"/><polygon points="57.56 26.62 62.3 22.43 65.71 26.12 57.56 26.62" fill="#f4c9a2"/><rect x="53.85" y="26.12" width="32.72" height="8.92" rx="4.46" ry="4.46" fill="none" stroke="#c96c47" strokeMiterlimit="10" strokeWidth="0.7"/><polyline points="31.32 51.47 58 51.47 63.11 50.17 58 26.9" fill="#f4c9a2" stroke="#c96c47" strokeMiterlimit="10" strokeWidth="1.47"/><path d="M56.45,27.37l5.85-4.94s5,6.48,9.68,7.77c2.87.8,7.56-1,7.56-1L68.89,11l-18.17,4.5-10.62,9H31.32" fill="#f4c9a2" stroke="#c96c47" strokeMiterlimit="10" strokeWidth="1.47"/><path d="M63.28,35l18.27-.15A23,23,0,0,1,92.65,54.39C92.65,67.14,82,77.48,69,77.48S45.26,67.14,45.26,54.39c0-.16,0-.72.07-1.82.43-5.57,2.43-14.17,10.43-24.64l2.78.71,3.26.83" fill="#e09f36"/><polygon points="77.78 44.94 77.78 61.79 72.72 61.79 72.72 66.34 71.04 66.34 71.04 61.79 67.71 61.79 67.71 66.34 66.03 66.34 66.03 61.79 60.94 61.79 60.94 60.11 76.1 60.11 76.1 46.62 62.62 46.62 62.62 56.77 72.72 56.77 72.72 54.23 64.31 54.23 64.31 48.34 74.41 48.34 74.41 50.02 65.99 50.02 65.99 52.55 74.41 52.55 74.41 54.23 74.41 54.23 74.41 56.77 74.41 56.77 74.41 58.45 60.94 58.45 60.94 44.94 65.99 44.94 65.99 40.39 67.67 40.39 67.67 44.94 71.04 44.94 71.04 40.39 72.72 40.39 72.72 44.94 77.78 44.94" fill="#704506"/><rect x="60.33" y="42.77" width="24.76" height="7.65" rx="3.82" ry="3.82" fill="#f4c9a2" stroke="#c96c47" strokeMiterlimit="10" strokeWidth="1.5"/><rect x="60" y="35.05" width="25.42" height="7.65" rx="3.82" ry="3.82" fill="#f4c9a2" stroke="#c96c47" strokeMiterlimit="10" strokeWidth="1.5"/><path d="M64.93,35H58.71c-2.8,0-5.07-2-5.07-4.46h0c0-2.46,2.27-4.46,5.07-4.46h6.43" fill="#f4c9a2" stroke="#c96c47" strokeMiterlimit="10" strokeWidth="1.47"/><path d="M82.11,26.12a4.46,4.46,0,0,1,4.46,4.46h0A4.46,4.46,0,0,1,82.11,35H58.31" fill="none" stroke="#c96c47" strokeMiterlimit="10" strokeWidth="1.55"/><rect x="1.18" y="23.17" width="29.61" height="29.47" fill="#fff" stroke="#342e30" strokeMiterlimit="10" strokeWidth="1.59"/><rect y="22.43" width="26.51" height="33.89" fill="#342e30"/></svg>
					</div>

					<div className="counter__content">
						<BitsoilSplitter minLen={this.props.length} substitution="0" input={this.props.totalTax} />
						<BitsoilSplitter minLen={this.props.length} substitution=" " input="tax" />
					</div>
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
