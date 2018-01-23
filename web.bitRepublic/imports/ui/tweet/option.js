import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';


class TweetOption extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
			return (
			<div className="container">
				{this.props.tweet}
			</div>
		);
  	}
}

export default withTracker(() => {

	return {
		
	};

})(TweetOption);