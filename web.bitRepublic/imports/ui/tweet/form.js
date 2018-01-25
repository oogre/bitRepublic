import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Schedules } from '../../api/bots/bots.js';

class TweetForm extends Component {
	constructor(props){
		super(props);
	}
	
	handleTweetSchedule(event){
		event.tweet = this.props.tweet._id
		this.props.onScheduleChange(event);
	}
	handleSubmit(event){
		event.preventDefault();
		let self = this;
		let data = {
			botId : this.props.botId,
			tweet : {
				_id : Random.id(),
				content : ReactDom.findDOMNode(self.refs["tweetContent"]).value.trim(),
				schedules : this.props.schedules.filter(function(schedule, key){
								let checked = ReactDom.findDOMNode(self.refs["schedule_"+ key]).checked;
								ReactDom.findDOMNode(self.refs["schedule_"+ key]).checked = false
								return checked;
							})
			}
		};
		ReactDom.findDOMNode(self.refs["tweetContent"]).value = '';
		
		Meteor.call("bot.tweet.update", data);

		return false;
	}
	renderCheckboxSchedule(){
		return this.props.schedules.map((schedule, k) => (
			<div key={k}>
				<label>
					<input
						type="checkbox"
						readOnly
						ref={"schedule" + "_" + k}
						value={k}
					/>
					{schedule.content}
				</label>
				<br/>
			</div>
		));
	}
	render() {
			return (
				<form 
					className={"container"+ " " + (this.props.visible ? "" : "hidden")} 
					onSubmit={this.handleSubmit.bind(this)}
				>
					<input
						type="text"
						ref="tweetContent"
						placeholder="Type to add tweetContent"
					/>
					<br/>
					{this.renderCheckboxSchedule()}
					<input
						type="submit"
						value="Submit"
					/>
				</form> 
		);
  	}
}

export default withTracker(() => {
	return {
		schedules : Schedules.find({}, {sort : {lvl:1}}).fetch()
	};

})(TweetForm);
