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
			<div className={"tab"+ " " + (this.props.visible ? "" : "hidden")}
			style={{
				backgroundImage: 'url(/images/postcard-bot/postcardBot'+this.props.k+'.png)',
				backgroundSize: 'contain',
				backgroundRepeat: 'no-repeat'
			}}>
				<div className="tab__content">
					<div className="tweet__content">
						{this.props.tweet.content}
					</div>
					<TweetSchedule
						id={this.props.id}
						onScheduleSelected={this.handleTweetSchedule.bind(this)}
						schedules={this.props.tweet.schedules}
					/>
				</div>
			</div>
		);
	}
}
