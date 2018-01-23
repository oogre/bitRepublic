import { Meteor } from 'meteor/meteor';
import { Bots } from './bots.js';

Meteor.methods({
	/**
	* @api {Meteor.call} /api/bots/create
	* @apiName bots.create
	* @apiGroup Private
	*
	* @apiDescription Call Meteor.call('bots.create' ... to create bot
	* the user has to be loged-in
	*
	* @apiSuccess {String} Bots._id the _id of the newly created bot
	*/
	'bots.create' : function(data){
		/*check(data.title, [String]);
		check(data.picture, String);
		check(data.action, String);
		check(data.tweets, [Object]);

*/
		if(! this.userId){
			throw new Meteor.Error('not-authorized');
		}
		let userId = this.userId;
		return Bots.insert({
			createdAt : new Date(),
		});
	}
});