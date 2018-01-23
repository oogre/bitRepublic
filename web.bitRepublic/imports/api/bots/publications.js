import { Meteor } from 'meteor/meteor';
import { Bots } from './bots.js';


if(Meteor.isServer){
	Meteor.publish('bots', function botsPublication(){
		return Bots.find();
	});
}