/*----------------------------------------*\
  bitRepublic - list.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 16:22:08
  @Last Modified time: 2018-04-12 11:02:33
\*----------------------------------------*/
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
					<span className="wallet-id">ID {Utilities.numberFormat(wallet.number, 6)}</span>
				</td>
				<td className="table__cell text-center">
					<BitsoilCounter type="simple" currencyBefore={true} bitsoil={wallet.bitsoil} tax={false} />
				</td>
			</tr>
		);
	}
	renderWallets (){
		return _.filter(this.props.wallets, (wallet, k) => {
			return k >= this.state.currentPage * config.WALLET_LIST.LIMIT && k < (this.state.currentPage+1) * config.WALLET_LIST.LIMIT
		}).map((wallet) => (
			this.renderWallet(wallet)
		));
	}
	render() {
		return (
			<div>
				<h2 className="title--primary">The redistribution mechanism</h2>

				<div className="container">
					<div className="section-intro">
						<p>Follow live the redistribution of bitsoils over participants wallets. Join and create your own personal wallet.</p>
						<p>Let’s make the data economy benefits all.</p>
					</div>
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
						<tfoot className="table__footer">
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
