/*----------------------------------------*\
  bitRepublic - gallery.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 19:55:35
  @Last Modified time: 2018-04-12 10:49:27
\*----------------------------------------*/
import React, { Component } from 'react';
import { GetContentGallery } from '../../api/images/methods.js';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDom from 'react-dom';

import { Data } from '../../api/data/data.js';
import { SaveData } from '../../api/data/methods.js';

import embed from "embed-video"

import FixeWait from '../fixe/wait.js';

// App component - represents the whole app
class FixeGallery extends Component {
	constructor(props){
		super(props);
		this.state = {
			video : false
		}
	}
	onSubmit(event){
		event.preventDefault();
		this.onChange({
			target : ReactDom.findDOMNode(this.refs.videoUrl)
		});
		return false;
	}
	onChange(event){
		let url = event.target.value;
		let data = {
			type : "video.gallery",
			value : url
		};
		SaveData.call(data, (err, res)=>{
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
		});
	}
	render() {
		return (
			<div className="gallery gallery--video">
				{
					this.props.isReady ?
						<div>
							<div
								className="video__wrapper"
								dangerouslySetInnerHTML={
									{
										__html: this.props.embedVideo
									}
								}
							>
							</div>
							{
								this.props.isAdmin ?
									<form
										className="container"
										onSubmit={this.onSubmit.bind(this)}
									>
										<input
											type="text"
											ref="videoUrl"
											defaultValue={this.props.video}
											placeholder="Past url of the video to render"
											onBlur={this.onChange.bind(this)}
										/>
									</form>
								:
									null
							}
						</div>
					:
						<FixeWait />
				}
			</div>
		);
	}
}
export default withTracker(() => {
	let dataReady = FlowRouter.subsReady("data");
	let video = "";
	let embedVideo = "";
	if(dataReady){
		video = Data.findOne({ type : "video.gallery"});
		if(_.isObject(video)){
			if(!_.isEmpty(video.value)){
				video = video.value;
			}else{
				video = video.default;
			}
		}
		if(SimpleSchema.RegEx.Url.test(video)){
			embedVideo = embed(video);
		}
	}
	return {
		isReady : dataReady,
		isAdmin : Meteor.user() && Meteor.user().roles.includes("admin"),
		video : video,
		embedVideo : embedVideo,
	};
})(FixeGallery);
