import React, { Component } from 'react';

export default class TweetSchedule extends Component {
	constructor(props){
		super(props);
	}
	handleScheduleChange(event){
		this.props.onScheduleSelected({
			schedule : event.target.value
		});
	}
	renderScheduleRadio(){
		return this.props.schedules.map((schedule, k) => (
			<div className="radio" key={k}>
				<input id={"schedule_"+this.props.id+"_"+k}
					defaultChecked={k == 0}
					type="radio"
					name={"schedule_"+this.props.id}
					value={schedule._id}
					onChange={this.handleScheduleChange.bind(this)}
				/>
				<label htmlFor={"schedule_"+this.props.id+"_"+k} className="tweet-schedule__option" >
					<span className="radio__label">
						{schedule.content}
					</span>
				</label>
			</div>
		));
	}
	render() {
		return (
			<div className="tweet-schedule">
				{this.renderScheduleRadio()}
			</div>
		);
	}
}
