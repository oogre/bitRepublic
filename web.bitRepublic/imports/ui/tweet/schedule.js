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
			<label key={k} >
				<input 
					defaultChecked={k == 0}
					type="radio" 
					name={"schedule_"+this.props.id} 
					value={schedule._id} 
					onChange={this.handleScheduleChange.bind(this)} 
				/>
				{schedule.content}<br />
			</label>
		));
	}
	render() {
		return (
			<div className="container">
				{this.renderScheduleRadio()}
			</div>
		);
	}
}