import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { BitSoils } from '../../api/bitsoils/bitsoils.js';
import * as Utilities from '../../utilities.js'


// BitSoilsCounter component - represents the bitsoil counter utility
class BitSoilsCounter extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
	    return (
			<div className="container">
				<div>
					{Utilities.numberFormat(this.props.count)} : BITSOIL
				</div>
				<div>
					{Utilities.numberFormat(this.props.count * 0.001)} : TAX
				</div>
			</div>
		);
  	}
}

export default withTracker((props) => {
	const request = {};
	if(props.userId){
		request.creatorId = props.userId
	}

	return {
		count : BitSoils.find(request).count()

	};
})(BitSoilsCounter);