import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import TweetSchedule from './schedule.js';

class TweetOption extends Component {
	constructor(props){
		super(props);
	}
	
	handleTweetSchedule(event){
		event.tweet = this.props.tweet._id
		this.props.onScheduleChange(event);
	}
	render() {
			return (
			<div className={"container"+ " " + (this.props.visible ? "" : "hidden")} >
				{this.props.tweet.content}
				<TweetSchedule 
					id={this.props.id}
					onScheduleSelected={this.handleTweetSchedule.bind(this)} 
					schedules={this.props.tweet.schedules}
				/>
			</div>
		);
  	}
}

export default withTracker(() => {

	return {
		
	};

})(TweetOption);