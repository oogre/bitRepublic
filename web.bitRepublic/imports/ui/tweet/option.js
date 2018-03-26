/*----------------------------------------*\
  bitRepublic - option.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 19:46:12
  @Last Modified time: 2018-02-02 00:08:30
\*----------------------------------------*/
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
			<div className={"tab"+ " " + (this.props.visible ? "" : "hidden") + " " + this.props.k}
			style={{
				backgroundImage: 'url(/images/postcard-bot/postcardBot'+this.props.k+'.gif)',
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
