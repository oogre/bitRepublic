/*----------------------------------------*\
  bitRepublic - images.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 23:37:09
  @Last Modified time: 2018-02-11 16:16:59
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import './methods.js';
import './publications.js';


export const Images = new FilesCollection({
	collectionName: 'avatars',
	allowClientCode: false, // Disallow remove files from Client
	downloadRoute: "/",
    storagePath: process.env.AVATAR_PATH,
	onBeforeUpload(file) {
		if(!this.userId)return 'YOu have to be logged in';

		// Allow upload files under 10MB, and only in png/jpg/jpeg formats
		if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
			return true;
		} else {
			return 'Please upload image, with size equal or less than 10MB';
		}
	},
	onAfterUpload(file) {
		if (Meteor.isServer)
		{
			let avatar = Images.findOne({_id: file._id});
			if (avatar){
				Meteor.users.update({
					_id: file.userId
				},{
					$set : {
						'profile.avatar' : file._id
					}
				});
			}
		}
	}
});