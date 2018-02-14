/*----------------------------------------*\
  bitRepublic - form.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 11:20:37
  @Last Modified time: 2018-02-14 14:08:56
\*----------------------------------------*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Random } from 'meteor/random';
import { Schedules } from '../../api/bots/bots.js';
import { BotTweetUpdate } from '../../api/bots/methods.js';
import { config } from '../../startup/config.js';
import MessageError from '../message/error.js';

class TweetForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			'error' : false,
			'error-login' : false,
			'error-admin' : false,
			'error-bot-model' : false,
			'error-tweet' : false,
			'error-tweet.content' : false,
			'error-tweet.schedules' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false
		}
	}

	handleTweetSchedule(event){
		event.tweet = this.props.tweet._id
		this.props.onScheduleChange(event);
	}
	handleSubmit(event){
		event.preventDefault();
		this.setState({
			'error' : false,
			'error-login' : false,
			'error-admin' : false,
			'error-bot-model' : false,
			'error-tweet' : false,
			'error-tweet.content' : false,
			'error-tweet.schedules' : false,
			'is-loading' : true,
			'has-error' : false,
			'has-success' : false
		});
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
		
		BotTweetUpdate.call(data, (err, res)=>{
			this.setState({'is-loading' : false});
			if (err && err.error === 'validation-error') {
				this.setState({'has-error' : true});
				err.details.forEach((fieldError) => {
					this.setState({
						["error-"+fieldError.name] : fieldError.type
					});
				});
				return;
			}
			if(err){
				this.setState({'has-error' : true});
				this.setState({
					["error"] : err.message
				});
				return;
			}
			this.setState({'has-success' : true});
			ReactDom.findDOMNode(this.refs["tweetContent"]).value = '';
		});
		
		return false;
	}
	renderCheckboxSchedule(){
		return this.props.schedules.map((schedule, k) => (
			<li className="table-list__item checkbox" key={schedule._id}>
				<input
					id={"schedule_" + schedule._id}
					type="checkbox"
					readOnly
					ref={"schedule" + "_" + k}
					value={k}
				/>
				<label htmlFor={"schedule_" + schedule._id} className="">
					<span className="">
						{schedule.content}
					</span>
				</label>
			</li>
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
					{	
						this.state["error-tweet.content"] ? 
							<MessageError 
								error={this.state["error-tweet.content"]} 
								messages={config.FORM.ERRORS.tweet.content}
							/>
						:
							null
					}
					<br/>
					<ul className="table-list">
						{ this.renderCheckboxSchedule() }
					</ul>
					{	
						this.state["error-tweet.schedules"] ? 
							<MessageError 
								error={this.state["error-tweet.schedules"]} 
								messages={config.FORM.ERRORS.tweet.schedules}
							/>
						:
							null
					}
					<input
						type="submit"
						value="Submit"
						className={
							"button--primary button--submit "+
							(this.state['is-loading'] ? "loading " : "") + 
							(this.state['has-success'] ? "success " : "") + 
							(this.state['has-error'] ? "error " : "")
						}
					/>
					{ this.state["error-login"] ? <MessageError error={this.state["error-login"]} messages={config.FORM.ERRORS.login} /> : null }
					{ this.state["error-admin"] ? <MessageError error={this.state["error-admin"]} messages={config.FORM.ERRORS.admin} /> : null }
					{ this.state["error-bot-model"] ? <MessageError error={this.state["error-bot-model"]} messages={config.FORM.ERRORS.bot-model} /> : null }
					{ this.state["error"] ? <MessageError error={this.state["error"]} messages={[]} /> : null }
				</form>
		);
  	}
}

export default withTracker(() => {
	return {
		schedules : Schedules.find({}, {sort : {lvl:1}}).fetch()
	};

})(TweetForm);
