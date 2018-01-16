import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { BitSoils } from '../../api/bitsoils/bitsoils.js';

// App component - represents the whole app
class BitSoilsCounter extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
	    return (
			<div className="container">
				There are {this.props.count} bitsoils
			</div>
		);
  	}
}

export default withTracker(() => {
	Meteor.subscribe('bitsoils');
	return {
		count : BitSoils.find().count()
	};
})(BitSoilsCounter);