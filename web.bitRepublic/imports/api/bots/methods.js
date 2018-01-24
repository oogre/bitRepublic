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

		if(! this.userId){
			throw new Meteor.Error('not-authorized');
		}
/*
		Bots.insert({
			model : true,
			title : [
				"be aware", 
				"Send your claim to the Prime Minister"
			],
			picture : "IMG",
			target : "politics",
			description : "Send a tweet postcard to the Prime Minister",
			tweets : [
				"tweetA0",
				"tweetA1",
				"tweetA2",
			]
		});
		*/
	}
});