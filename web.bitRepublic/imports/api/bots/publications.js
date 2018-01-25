import { Meteor } from 'meteor/meteor';
import { Bots } from './bots.js';
import { Schedules } from './bots.js';


if(Meteor.isServer){
	Meteor.publish('bots', function botsPublication(){
		return Bots.find();
	});
	Meteor.publish('schedules', function schedulesPublication(){
		return Schedules.find();
	});
}