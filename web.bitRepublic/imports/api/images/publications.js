/*----------------------------------------*\
  bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 22:53:07
  @Last Modified time: 2018-02-02 00:06:38
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Images } from './images.js';


if(Meteor.isServer){
	Meteor.publish('my.files.images', function () {
		return Images.find({userId:this.userId}).cursor;
	});
}