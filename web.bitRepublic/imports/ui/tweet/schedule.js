/*----------------------------------------*\
  bitRepublic - schedule.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 18:16:40
  @Last Modified time: 2018-04-26 19:10:03
\*----------------------------------------*/
import React, { Component } from 'react';

export default class TweetSchedule extends Component {
	constructor(props){
		super(props);
		this.state = {
			scheduleValue : 0,
			selectedSchedule : null,
			updateSeletedSchedule : null
		}
	}
	handleScheduleChange(event){
		this.props.onScheduleSelected({
			schedule : event.target.value
		});
		/*
		*/

		
		if($(event.target).prop("checked")){
			clearInterval(this.state.updateSeletedSchedule);
			if(this.state.selectedSchedule){
				let txt = this.state.selectedSchedule.html();
				let value = parseInt(txt.match(/(\d+)/)[0]);
				txt = txt.replace(value, this.state.scheduleValue);
				this.state.selectedSchedule.html(txt);
			}
			this.setState({ 
				scheduleValue : $(event.target).next().find(".radio__label").html().match(/(\d+)/)[0],
				selectedSchedule : $(event.target).next().find(".radio__label"),
				updateSeletedSchedule : setInterval(()=>{
					let txt = this.state.selectedSchedule.html();
					let value = parseInt(txt.match(/(\d+)/)[0]);
					txt = txt.replace(value, value > 0  ? (value-1) : this.state.scheduleValue);
					this.state.selectedSchedule.html(txt);
				}, 1000)
			});
		}
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
