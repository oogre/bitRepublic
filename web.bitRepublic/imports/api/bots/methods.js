import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

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
		/*
			Meteor.call("bots.create", "sZHyzfJdiH9HR7n65", { 
				bitsoil: 0.000004, 
				botId: "mMGWJQZMuiT8D2spA",
				tweet: [{tweetId: "4ZJ3sJ3gdJn44owk7", schedule: "qan2reqZkNm3uRN64"}]
			});
		*/
		check(data, Object);
		check(data.botId, String);
		check(data.bitsoil, Number);
		
		check(data.tweet, [Object]);
		
		let botModel = Bots.findOne({
			model : true,
			_id : data.botId
		});
		if(!botModel){
			throw new Meteor.Error('no-bot-model');
		}

		check(botModel._id, String);
		check(botModel.tweets, [Object]);

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
		return botId;
	},
	'bot.tweet.update' : function(data){
		/*		
		{	botId:"W57jTEdK2rMAuBCFo",
			tweet : {
				content:"sdfdfs",
				schedules:[
					{content: "Once an hour", value: "every hour"},
					{content: "Once a week", value: "every week"}
				]
			}
		}
		*/
		check(data.botId, String);
		check(data.tweet, Object);
		check(data.tweet.content, String);
		check(data.tweet.schedules, [Object]);

		if(_.isEmpty(data.tweet.content)){
			throw new Meteor.Error('form-error', 'tweet content must be filled');
		}
		if(_.isEmpty(data.tweet.schedules)){
			throw new Meteor.Error('form-error', 'schedule must be filled');
		}

		if((!this.userId) && Meteor.user().roles.includes("admin")){
			throw new Meteor.Error('not-authorized');
		}

		Bots.update({
		 _id : data.botId
		}, {
			$push : {
				tweets : data.tweet
			}
		});
	},
	'bot.tweet.delete' :function(data){
		/*		
		{	botId:"W57jTEdK2rMAuBCFo",
			tweetId : "W57jTEdK2rMAuBCFo",
		}
		*/

		check(data.botId, String);
		check(data.tweetId, String);

		if((!this.userId) && Meteor.user().roles.includes("admin")){
			throw new Meteor.Error('not-authorized');
		}
		let bot = Bots.findOne({
		 _id : data.botId
		});
		if(!bot){
			throw new Meteor.Error('unknow bot');
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
	}


});