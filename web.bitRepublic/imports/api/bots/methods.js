import { Meteor } from 'meteor/meteor';

import { Bots } from './bots.js';
import { Schedules } from './bots.js';
import { Actions } from '../actions/actions.js';
import * as Utilities from '../../utilities.js'

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
	'bots.create' : function(userId, data){
		console.log(data);

		new SimpleSchema({
			userId: { type: String, regEx: SimpleSchema.RegEx.Id },
			data: { type: Object },
			'data.bitsoil': { type: Number, decimal : true },
			'data.botId': { type: String, regEx: SimpleSchema.RegEx.Id },
			'data.tweet': { type: Array },
			'data.tweet.$': { type: Object },
			'data.tweet.$.tweetId': { type: String, regEx: SimpleSchema.RegEx.Id },
			'data.tweet.$.schedule': { type: String, regEx: SimpleSchema.RegEx.Id }
		}).validate({
			userId, 
			data
		});

		let botModel = Bots.findOne({
			model : true,
			_id : data.botId
		});

		if(!botModel){
			throw new Meteor.Error("validation-error", 'The bot model is not known');
		}

		if(!_.isString(botModel._id) || !_.isArray(botModel.tweets)){
			throw new Meteor.Error("validation-error", 'The bot model is corrupted');
		}

		let botId = Bots.insert({
			createdAt : new Date(),
			owner : userId,
			model : botModel._id,
			bitsoil: data.bitsoil,
			active : true
		});

		let actionIds = data.tweet.map(function(tweet){
			let schedule = Schedules.findOne(tweet.schedule);
			return Actions.insert({
				bot : botId,
				active : true,
				counter : 0,
				content : _.find(botModel.tweets, function(t){
							return t._id == tweet.tweetId
						}).content,
				createdAt : new Date(),
				nextActivation : Utilities.nowPlusSeconds(60),
				interval : schedule.value,
				bitsoil: data.bitsoil,
			});
		});

		Bots.update({
			_id : botId
		}, {
			$set : {
				actions : actionIds,
				active : true
			}
		});

		return {
			success : true,
			message : "Tweet updated",
			data : botId
		};
	},
	'bot.tweet.update' : function(data){
		new SimpleSchema({
			botId: { type: String, regEx: SimpleSchema.RegEx.Id },
			'tweet': { type: Object },
			'tweet._id': { type: String, regEx: SimpleSchema.RegEx.Id },
			'tweet.content': { type: String },
			'tweet.schedules': { type: Array },
			'tweet.schedules.$': { type: Object },
			'tweet.schedules.$._id': { type: String, regEx: SimpleSchema.RegEx.Id },
			'tweet.schedules.$.content': { type: String },
			'tweet.schedules.$.value': { type: Number }
		}).validate(data);

		if( !Meteor.userId() && Meteor.user().roles.includes("admin")){
			throw new Meteor.Error("validation-error", 'You do not have the right to perform this action');
		}

		Bots.update({
		 _id : data.botId
		}, {
			$push : {
				tweets : data.tweet
			}
		});

		return {
			success : true,
			message : "Tweet updated"
		};
	},
	'bot.tweet.delete' :function(data){
		new SimpleSchema({
			botId: { type: String, regEx: SimpleSchema.RegEx.Id },
			'tweetId': { type: String, regEx: SimpleSchema.RegEx.Id }
		}).validate(data);

		if( !Meteor.userId() && Meteor.user().roles.includes("admin")){
			throw new Meteor.Error("validation-error", 'You do not have the right to perform this action');
		}

		let bot = Bots.findOne({ _id : data.botId });
		if(!bot){
			throw new Meteor.Error("validation-error", 'The bot is not known');
		}
		
		Bots.update({
		 _id : data.botId
		}, {
			$set : {
				tweets : bot.tweets.filter(function(tweet){
					return tweet._id != data.tweetId;
				})
			}
		});
		
		return {
			success : true,
			message : "Tweet deleted"
		};
	}
});