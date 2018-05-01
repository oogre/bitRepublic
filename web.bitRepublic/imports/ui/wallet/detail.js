/*----------------------------------------*\
	bitRepublic - detail.js
	@author Evrard Vincent (vincent@ogre.be)
	@Date:   2018-01-28 13:23:23
	@Last Modified time: 2018-02-02 00:08:53
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import * as Utilities from '../../utilities.js'
import BitsoilCounter from "../bitsoil/counter.js";

// App component - represents the whole app
export default class WalletDetail extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="container">
				<section className="section--profile">
					<h2 className="title--profile">Your wallet</h2>
					<div className="section__content section__content--id">
						<ul className="id-card">
							<li className="id-card__item">
								id number: {Utilities.numberFormat(this.props.wallet.number, 7)}
							</li>
							<li className="id-card__item">
								Value of your wallet: <BitsoilCounter type="simple" currencyBefore={true} bitsoil={this.props.wallet.bitsoil} tax={false} />
							</li>
							<li className="id-card__item">
								<span className="id-card__item__label">private key:</span> <span className="id-card__item__key">{this.props.wallet.key}</span>
							</li>
							<li className="id-card__item">
								<span className="id-card__item__label">public key:</span> <span className="id-card__item__key">{this.props.wallet.publicKey}</span>
							</li>
						</ul>
					</div>
				</section>
			</div>
		);
		}
}
