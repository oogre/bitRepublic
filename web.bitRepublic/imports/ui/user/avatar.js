import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Images } from '../../api/images/images.js';
import FileReaderInput from 'react-file-reader-input';

class UserAvatar extends Component {
	constructor(props){
		super(props);
		this.state = {
			currentUpload: false
		}
	}
	handleChange(event, results){
		let self = this;
		results.forEach(result => {
			const [e, file] = result;
			const upload = Images.insert({
				file: file,
				streams: 'dynamic',
				chunkSize: 'dynamic'
			}, false);

			upload.on('start', function () {
				self.setState({
					currentUpload : this
				});
			});

			upload.on('end', function (error, fileObj) {
				if (error) {
					alert('Error during upload: ' + error);
				} else {
					Meteor.call("users.setAvatar", fileObj._id);
				}
				self.setState({
					currentUpload : false
				});
			});

			upload.start();
		});
	}
	render() {
		let progress = this.state.currentUpload ? this.state.currentUpload.progress.get() : false;

		return (
			<div className="container">

				<FileReaderInput
					as="url"
					id="my-file-input"
					onChange={this.handleChange.bind(this)}
				>
					<img
						style={{maxWidth: 100 + 'px'}}
						src={this.props.avatar}
						alt="avatar"
					/>
				</FileReaderInput>

				{	progress !== false ?
						progress 
					: 
						null
				}
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