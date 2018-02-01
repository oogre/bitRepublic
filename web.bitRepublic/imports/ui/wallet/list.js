import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import * as Utilities from '../../utilities.js'
import BitsoilCounter from "../bitsoil/counter.js";

import { Wallets } from '../../api/wallets/wallets.js';

import {config} from '../../startup/config.js';

// App component - represents the whole app
class WalletList extends Component {
	constructor(props){
		super(props);
		this.state = {
			skip : 0,
		}
	}
	handleSkip(c){
		this.setState({
			skip : this.state.skip + c
		});
	}
	renderWallet(wallet){
		return (
			<tr className="table__row" key={wallet._id}>
				<td className="table__cell">
					<span className="wallet-id">ID {Utilities.numberFormat(wallet.number, 6)}</span>
				</td>
				<td className="table__cell">
					<BitsoilCounter currencyBefore={true} bitsoil={wallet.bitsoil} tax={false} />
				</td>
			</tr>
		);
	}
	renderWallets (){
		let self = this;
		return _.filter(self.props.wallets, function(wallet, k){
			return k >= self.state.skip && k < self.state.skip+config.WALLET_LIST.LIMIT
		}).map((wallet) => (
			self.renderWallet(wallet)
		));
	}
	render() {
		return (
			<div className="container">
				<table className="table table--redistribution">
					<thead className="table__header">
						<tr>
							<th className="table__header__cell">ID MEMBERS</th>
							<th className="table__header__cell">WALLETS</th>
						</tr>
					</thead>
					<tbody className="table__body">
						{this.renderWallets()}
					</tbody>
				</table>

				<ul>
					<li style={{ display : this.state.skip > 0 ? "block" : "none" }}>
						<button onClick={this.handleSkip.bind(this, -config.WALLET_LIST.LIMIT)}>prev</button>
					</li>
					<li>
						{
							(this.state.skip + 1)
						}
						-
						{
							Math.min(this.props.count, this.state.skip + config.WALLET_LIST.LIMIT)
						}
					</li>
					<li style={{ display : this.state.skip < (this.props.count - config.WALLET_LIST.LIMIT) ? "block" : "none" }}>
						<button onClick={this.handleSkip.bind(this, config.WALLET_LIST.LIMIT)}>next</button>
					</li>

				</ul>
			</div>
		)
  	}
}

export default withTracker(() => {
	let wallets = Wallets.find({
		type : config.WALLET_TYPE.PERSONNAL
	}, {
		fields : {
			number : 1,
			bitsoil : 1,
			updatedAt : 1
		},
		sort : {
			updatedAt : -1
		}
	});
	return {
		wallets : wallets.fetch(),
		count : wallets.count(),
	};
})(WalletList);
