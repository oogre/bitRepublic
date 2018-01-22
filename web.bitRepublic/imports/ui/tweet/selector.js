import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class TweetSelectorModal extends Component {
	constructor(props){
		super(props);
		
	}


	render() {
		return (
			<div className="container">
				{ this.props.bot.target }
				{ this.props.bot.tweets[0] }
			</div>
		);
	}
}

export default withTracker(() => {
	return {
	};
})(TweetSelectorModal);