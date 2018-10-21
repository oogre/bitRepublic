/*----------------------------------------*\
  bitRepublic - list.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 16:22:08
  @Last Modified time: 2018-10-21 14:35:02
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import * as Utilities from '../../utilities.js'
import BitsoilCounter from "../bitsoil/counter.js";

import { Wallets } from '../../api/wallets/wallets.js';

import {config} from '../../startup/config.js';
import T from './../../i18n/index.js';

// App component - represents the whole app
class WalletList extends Component {
	constructor(props){
		super(props);
		this.state = {
			currentPage : 0,
		}
	}
	handleSkip(c){
		this.setState({
			currentPage : c
		});
	}
	renderWallet(wallet){
		return (
			<tr className="table__row" key={wallet._id}>
				<td className="table__cell">
					<span className="wallet-id"><T>Menu.ID</T> {Utilities.numberFormat(wallet.number, 6)}</span>
				</td>
				<td className="table__cell text-center">
					<BitsoilCounter type="simple" currencyBefore={true} bitsoil={wallet.bitsoil} tax={false} noFormat={true} />
				</td>
			</tr>
		);
	}
	renderWallets (){
		let w = _.filter(this.props.wallets, (wallet, k) => {
			return k >= this.state.currentPage * config.WALLET_LIST.LIMIT && k < (this.state.currentPage+1) * config.WALLET_LIST.LIMIT
		});
		let longest = w.reduce((l, wallet) => { 
			let f = _.isNumber(wallet.bitsoil) ? wallet.bitsoil.toFixed(6) : wallet.bitsoil;
			return l.length > f.length ? l : f;
		}, "");
		return w.map(wallet => {
			if(_.isNumber(wallet.bitsoil)){
				wallet.bitsoil = wallet.bitsoil.toFixed(6);//Utilities.bitsoilFormat(wallet.bitsoil);
				while(wallet.bitsoil.length <= longest.length) wallet.bitsoil = "0"+wallet.bitsoil;
			}
			return wallet;
		}).map((wallet) => (
			this.renderWallet(wallet)
		));
	}
	render() {

		return (
			<div>
				<h2 className="title--primary"><T>Menu.theRedistributionMechanism</T></h2>

				<div className="container">
					<div className="section-intro">
						<p><T>Redistribution.overWalletList.A</T></p>
						<p><T>Redistribution.overWalletList.B</T></p>
					</div>
					<table className="table table--redistribution">
						<thead className="table__header">
							<tr>
								<th className="table__header__cell"><T>Menu.IDMEMBERS</T></th>
								<th className="table__header__cell"><T>Menu.WALLETS</T></th>
							</tr>
						</thead>
						<tbody className="table__body">
							{this.renderWallets()}
						</tbody>
						<tfoot className="table__footer" style={{ visibility : this.props.pages > 1 ? "visible" : "hidden" }}>
							<tr>
								<td colSpan="2">
									<ul className="table-pagination">
										<li className="table-pagination__item" style={{ visibility : this.state.currentPage > 0 ? "visible" : "hidden" }}>
											<a className="table-pagination__button" onClick={this.handleSkip.bind(this, this.state.currentPage - 1 )}>&lt;</a>
										</li>
										{
											Array(this.props.pages).fill().map((action, k) => (
												<li key={k} className={(k == this.state.currentPage ? "selected" : " " ) + " table-pagination__item"}>
													<a className="table-pagination__button" onClick={this.handleSkip.bind(this, k)}>{k+1}</a>
												</li>
											))
										}
										<li className="table-pagination__item" style={{ visibility : this.state.currentPage < this.props.pages-1  ? "visible" : "hidden" }}>
											<a className="table-pagination__button" onClick={this.handleSkip.bind(this, this.state.currentPage + 1 )}>&gt;</a>
										</li>
									</ul>
								</td>
							</tr>
						</tfoot>
					</table>

				</div>
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
		pages : Math.ceil(wallets.count()/config.WALLET_LIST.LIMIT),
		wallets : wallets.fetch()
	};
})(WalletList);
