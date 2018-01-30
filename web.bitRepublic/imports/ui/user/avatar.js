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
				self.setState({'is-loading' : true});
				UserSetAvatar.call({avatarId : res._id}, (err, res) =>{
					self.setState({'is-loading' : false});
					if (err && err.error === 'validation-error') {
						self.setState({'has-error' : true});
						err.details.forEach((fieldError) => {
							self.setState({
								["error-"+fieldError.name] : fieldError.type
							});
						});
						return;
					}
					self.setState({'has-success' : true});
				});
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
	renderPicture(){
		return (
			<div className="container">
				<img
					style={{maxWidth: 100 + 'px'}}
					src={this.props.avatar}
					alt="avatar"
				/>
			</div>
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
			</div>

		);
	}
	render() {
		return (
			<div className="container">
				{ this.props.update ? this.renderFileInput() : this.renderPicture() }
			</div>
		);
	}
}



export default withTracker(() => {
	let currentUser = Meteor.user();
	let avatar = currentUser && currentUser.profile && currentUser.profile.avatar ? Images.collection.findOne({_id : currentUser.profile.avatar}) : false;//
	if(avatar){
		avatar = Images.link(avatar);
	}
	else{
		avatar = "/images/avatar.png";
	}
	return {
		currentUser : currentUser,
		avatar : avatar
	};
})(UserAvatar);