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
				<h4>your wallet</h4>
				id number : {Utilities.numberFormat(this.props.wallet.number, 7)}<br/>
				amount redistributed : <BitsoilCounter currencyBefore={true} bitsoil={this.props.wallet.bitsoil} tax={false} /><br/>
				key : {this.props.wallet._id}<br/>
			</div>
		);
  	}
}
