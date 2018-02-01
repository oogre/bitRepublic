/*----------------------------------------*\
  bitRepublic - schedule.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 18:16:40
  @Last Modified time: 2018-02-02 00:08:29
\*----------------------------------------*/
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
		//defaultChecked={k == 0}
		return this.props.schedules.map((schedule, k) => (
			<div className="radio" key={k}>
				<input id={"schedule_"+this.props.id+"_"+k}
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
