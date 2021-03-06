/*----------------------------------------*\
  bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 23:31:20
  @Last Modified time: 2018-02-02 00:06:52
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Bots } from './bots.js';
import { Actions } from '../actions/actions.js';
import { Schedules } from './bots.js';


if(Meteor.isServer){
	Meteor.publish('public.bots', function botsPublication(){
		let bots = Bots.find({
			model : true,
			owner : {
				$exists : 0
			}
		});

		let actions = Actions.find({
			bot : {
				$in : _.pluck(bots.fetch(), '_id')
			}
		});
		return  [bots, actions];
	});

	Meteor.publish('my.bots', function botsPublication(){

		if (!this.userId) {
			return this.ready();
		}

		let bots = Bots.find({
			$or : [{
				owner : this.userId
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