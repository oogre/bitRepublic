import React, { Component } from 'react';
import TweetSchedule from './schedule.js';

export default class TweetOption extends Component {
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