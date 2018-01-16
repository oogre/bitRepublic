import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import BitSoilsCounter from '../bitsoil/counter.js';

// App component - represents the whole app
class BotDisplayer extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
	    return (
			<div className="container">
				<ul>
					<li>
						[IMG]
					</li>
					<li>
						<BitSoilsCounter sentence={this.props.sentence} userId={this.props.userId}/>
					</li>
					<li>
						Tax counter
					</li>
				</ul>
			</div>
		);
  	}
}

export default withTracker(() => {
	
	return {
		
	};
})(BotDisplayer);