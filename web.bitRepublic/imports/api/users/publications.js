import { Meteor } from 'meteor/meteor';


if(Meteor.isServer){
	Meteor.publish(null, function (){
		return Meteor.roles.find({})
	});
}