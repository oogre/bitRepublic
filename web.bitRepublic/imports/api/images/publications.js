import { Meteor } from 'meteor/meteor';
import { Images } from './images.js';


if(Meteor.isServer){
	Meteor.publish('my.files.images', function () {
		return Images.find({userId:Meteor.userId()}).cursor;
	});
}