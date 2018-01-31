import { Meteor } from 'meteor/meteor';
import { Bots } from './bots.js';
import { Actions } from '../actions/actions.js';
import { Schedules } from './bots.js';


if(Meteor.isServer){
	Meteor.publish('bots', function botsPublication(){
		let bots = Bots.find({
			$or : [{
				owner : Meteor.userId()
			}, {
				model : true
			}]
		});
		let actions = Actions.find({
			bot : {
				$in : _.pluck(bots.fetch(), '_id')
			}
		});
		return  [bots, actions];
	});

	Meteor.publish('my.bots', function botsPublication(){
		let bots = Bots.find({
			$or : [{
				owner : Meteor.userId()
			},{
				model : true
			}]
		});
		
		let actions = Actions.find({
			bot : {
				$in : _.pluck(bots.fetch(), '_id')
			}
		});
		
		return [bots, actions];

		
	});
	
	Meteor.publish('schedules', function schedulesPublication(){
		return Schedules.find();
	});
}