/*----------------------------------------*\
  bitRepublic - avatar.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 16:11:30
  @Last Modified time: 2018-02-11 16:18:54
\*----------------------------------------*/
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Images } from '../../api/images/images.js';
import FileReaderInput from 'react-file-reader-input';

import { UserSetAvatar } from '../../api/users/methods.js';
import MessageError from '../message/error.js';

class UserAvatar extends Component {
	constructor(props){
		super(props);
		this.state = {
			imgError : false,
			'error' : false,
			'error-login' : false,
			'error-image' : false,
			'is-loading' : false,
			'has-error' : false,
			'has-success' : false,
			uploading: [],
			progress: 0,
			inProgress: false
		}
	}
	handleChange(event, results){
		let self = this;
		this.setState({
			'error' : false,
			'error-login' : false,
			'error-image' : false,
			'is-loading' : true,
			'has-error' : false,
			'has-success' : false,
		});

		results.forEach(result => {
			const [e, file] = result;
			const upload = Images.insert({
				file: file,
				streams: 'dynamic',
				chunkSize: 'dynamic'
			}, false);

			self.setState({
				uploading: upload, // Keep track of this instance to use below
				inProgress: true // Show the progress bar now
			});

			upload.on('end', (err, res) => {
				self.setState({
					'is-loading' : false
				});
				if (err) {
					self.setState({
						'has-error' : true,
						'error-avatar': 'error'
					});
					return;
				}
				self.setState({'has-success' : true, imgError : false});
			});


			upload.on('uploaded', function (error, fileObj) {
				//console.log('uploaded: ', fileObj);

				// Remove the filename from the upload box
				//self.refs['fileinput'].value = '';

				// Reset our state for the next file
				self.setState({
					uploading: [],
					progress: 0,
					inProgress: false
				});
			});

			upload.on('error', function (error, fileObj) {
				//console.log('Error during upload: ' + error);
			});

			upload.on('progress', function (progress, fileObj) {
				//console.log('Upload Percentage: ' + progress);
				// Update our progress bar
				self.setState({
					progress: progress
				})
			});
			upload.start();
		});
	}
	handleErrorImage (){
		this.setState({
			imgError : true
		});
	}
	renderPicture(){
		return (
			<img className="avatar__picture"
				style={{maxWidth: 100 + 'px'}}
				src={ this.state.imgError ? this.props.defaultAvatar : this.props.avatar}
				alt="avatar"
				onError={this.handleErrorImage.bind(this)}
			/>
		);
	}
	renderProgressBar(){
		return (
			<div className="progress progress-bar-default">
				<div 	style={{width: this.state.progress + '%'}}
						aria-valuemax="100" aria-valuemin="0"
						aria-valuenow={ this.state.progress || 0 } role="progressbar"
						className="progress-bar"
				>
					<span>
						{this.state.progress}%
					</span>
				</div>
			</div>
		);
	}
	renderFileInput(){
		return (
			<div className={
					"container"+
					(this.state['is-loading'] ? " loading " : "") +
					(this.state['has-success'] ? " success " : "") +
					(this.state['has-error'] ? " error " : "")
			}>
				<FileReaderInput as="url" id="my-file-input" onChange={ this.handleChange.bind(this) }>
					{this.renderPicture()}
				</FileReaderInput>

				{ this.state.inProgress ? this.renderProgressBar() : null }

				{ this.state["error-login"] ? <MessageError error={ this.state["error-login"] } messages={ config.FORM.ERRORS.login } /> : null }
				{ this.state["error-avatar"] ? <MessageError error={ this.state["error-avatar"] } messages={ config.FORM.ERRORS.avatar } /> : null }
				{ this.state["error"] ? <MessageError error={this.state["error"]} messages={[]} /> : null }
			</div>

		);
	}
	render() {
		return (
			<div className="avatar">
				{ this.props.update ? this.renderFileInput() : this.renderPicture() }
			</div>
		);
	}
}

export default withTracker(() => {
	let myFilesImagesReady = FlowRouter.subsReady("my.files.images");
	let isReady = Meteor.user() && myFilesImagesReady;
	let defaultAvatar = "/images/avatar.png";
	let avatar = defaultAvatar;
	if(isReady && Meteor.user().profile.avatar){
		let img = Images.collection.findOne({_id : Meteor.user().profile.avatar});
		if(img){
			avatar = Images.link(img);
		}
	}
	return {
		defaultAvatar : defaultAvatar,
		avatar : avatar
	};
})(UserAvatar);
