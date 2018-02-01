/*----------------------------------------*\
  bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-24 23:45:10
  @Last Modified time: 2018-02-02 00:05:56
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';


if(Meteor.isServer){
	Meteor.publish(null, function (){
		return Meteor.roles.find({})
	});
}