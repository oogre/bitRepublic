import React, { Component } from 'react';
//import ReactDom from 'react-dom';
//import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';


export default class TweetSchedule extends Component {
	constructor(props){
		super(props);
		
	}
	handleScheduleChange(event){
		this.props.onScheduleSelected(event.target.value);
	}
	render() {
		return (
			<div className="container">
				<label >
					<input type="radio" ref="schedule" name="schedule" value="daily" onChange={this.handleScheduleChange.bind(this)} /> Once an hour
				</label>
				<br />
  				<label >
					<input type="radio" ref="schedule" name="schedule" value="weekly" onChange={this.handleScheduleChange.bind(this)} /> Once a week
				</label>
				<br />
  				<label>
  					<input type="radio" ref="schedule" name="schedule" value="monthly" onChange={this.handleScheduleChange.bind(this)} /> Once a month
  				</label>
			</div>
		);
	}
}
/*

export default withTracker(() => {
	return {
	};
})(TweetSchedule);
*/