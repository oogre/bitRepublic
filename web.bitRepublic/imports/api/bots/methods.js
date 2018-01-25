import { Meteor } from 'meteor/meteor';
import { Bots } from './bots.js';
import { check } from 'meteor/check';

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
				botId: 'Ns4NdncH4tFKyBFEH',
				tweet: [{tweetId: 'BCPqzKQNi335LtWtF', schedule: 'every minute'},
						{tweetId: 'ptmdJFZDwNYJnsxJ6', schedule: 'every month'},
						{tweetId: 'Z3SKmppfXfhocpneT', schedule: 'every hour'}
				]
			});
		*/
		check(userId, String);

		check(data, Object);
		check(data.botId, String);
		check(data.tweet, [Object]);
		
		let botModel = Bots.findOne({
			model : true,
			_id : data.botId
		});
		if(!botModel){
			throw new Meteor.Error('no-bot-model');
		}
		
		let botObject = {
			createdAt : new Date(),
			owner : userId,
			origin : botModel._id,
			target : botModel.target,
			tweets : data.tweet.map(function(tweet){
						return {
							counter : 0,
							content : _.find(botModel.tweets, function(t){
										return t._id == tweet.tweetId
									}).content,
							schedule : tweet.schedule
						}
					})
		};

		console.log(botObject);

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