/*----------------------------------------*\
  larbitsSisters - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-04-11 18:54:53
  @Last Modified time: 2018-04-12 10:33:06
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Data } from './data.js';

if(Meteor.isServer){
	Meteor.publish("data", function (){
		return Data.find({})
	});
}