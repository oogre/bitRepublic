import { FilesCollection } from 'meteor/ostrio:files';
import './methods.js';
import './publications.js';


export const Images = new FilesCollection({
	collectionName: 'Images',
	allowClientCode: false, // Disallow remove files from Client
	onBeforeUpload(file) {
		if(!this.userId)return 'YOu have to be logged in';

		// Allow upload files under 10MB, and only in png/jpg/jpeg formats
		if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
			return true;
		} else {
			return 'Please upload image, with size equal or less than 10MB';
		}
	}
});