/*----------------------------------------*\
  bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 23:37:04
  @Last Modified time: 2018-05-01 23:19:44
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';

import { config } from '../../startup/config.js';
import { Bots } from './bots.js';
import { Schedules } from './bots.js';
import { Targets } from '../targets/targets.js';
import { Actions } from '../actions/actions.js';
import * as Utilities from '../../utilities.js';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';


export const CreateBot = new ValidatedMethod({
	name: 'Bots.methods.create',
	validate: new SimpleSchema({
		userId: { type: String, regEx: SimpleSchema.RegEx.Id },
		'bitsoil': { type: Number, decimal : true },
		'botModelId': { type: String, regEx: SimpleSchema.RegEx.Id },
		'tweet': { type: [Object], minCount: 1},
		'tweet.$.tweetId': { type: String, regEx: SimpleSchema.RegEx.Id },
		'tweet.$.schedule': { type: String, regEx: SimpleSchema.RegEx.Id },
		target : { type : Object },
		'target.value' : { type: String },
		'target.label' : { type: String }
	}).validator({clean:true}),
	mixins: [RateLimiterMixin],
	rateLimit: config.METHODS.RATE_LIMIT.FAST,
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ userId, bitsoil, botModelId, tweet, target }) {
		
		const botModel = Bots.findOne({
			model : true,
			_id : botModelId
		});
		if(!botModel){
			const errors = [{
				name: 'bot-model',
				type: 'needed'
			}];
			throw new ValidationError(errors);
		}

		if(!_.isString(botModel._id) || !_.isArray(botModel.tweets)){
			const errors = [{
				name: 'bot-model',
				type: 'corrupted'
			}];
			throw new ValidationError(errors);
		}
		const schedules = Schedules.find({}).fetch();

		if(SimpleSchema.RegEx.Id.test(target.value)){
			target = Targets.findOne(target.value, {
				fields : {
					twitter_account : 1
				}
			});
			if(!target){
				const errors = [{
					name: 'target',
					type: 'needed'
				}];
				throw new ValidationError(errors);
			}
			if(!_.isArray(target.twitter_account)){
				const errors = [{
					name: 'target',
					type: 'corrupted'
				}];
				throw new ValidationError(errors);
			}
			target = target.twitter_account;
		}else{
			target = target.value.split(/, ?/g);
		}
		
		const botId = Bots.insert({
			createdAt : new Date(),
			owner : userId,
			model : botModelId,
			bitsoil: bitsoil,
			active : true
		});

		let actionIds = tweet.map((tweet)=>{
			return Actions.insert({
				bot : botId,
				active : true,
				counter : 0,
				content : _.find(botModel.tweets, (t)=>{
							return t._id == tweet.tweetId
						}).content,
				createdAt : new Date(),
				nextActivation : new Date(),
				interval : _.find(schedules, (schedule)=>{
							return schedule._id == tweet.schedule;
						}).value,
				bitsoil: bitsoil,
				target : target
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
			message : "Bot created",
			data : botId
		};
	}
});


export const BotTweetUpdate = new ValidatedMethod({
	name: 'Bots.methods.tweet.update',
	validate: new SimpleSchema({
		botId: { type: String, regEx: SimpleSchema.RegEx.Id },
		'tweet': { type: Object },
		'tweet._id': { type: String, regEx: SimpleSchema.RegEx.Id },
		'tweet.content': { type: String, min: config.TWEETS.LEN.MIN, max: config.TWEETS.LEN.MAX },
		'tweet.schedules': { type: [Object], minCount: 2},
		'tweet.schedules.$._id': { type: String, regEx: SimpleSchema.RegEx.Id },
		'tweet.schedules.$.content': { type: String },
		'tweet.schedules.$.value': { type: Number }
	}).validator({clean:true}),
	mixins: [RateLimiterMixin],
	rateLimit: config.METHODS.RATE_LIMIT.FAST,
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ botId, tweet }) {
		if(!Meteor.userId()){
			const errors = [{
				name: 'login',
				type: 'needed'
			}];
			throw new ValidationError(errors);
		}
		if(!Meteor.user().roles.includes("admin")){
			const errors = [{
				name: 'admin',
				type: 'needed'
			}];
			throw new ValidationError(errors);
		}
		if(!Bots.findOne({model : true,_id : botId})){
			const errors = [{
				name: 'bot-model',
				type: 'needed'
			}];
			throw new ValidationError(errors);
		}

		Bots.update({model : true,_id : botId}, {
			$push : {
				tweets : tweet
			}
		});

		return {
			success : true,
			message : "Tweet updated"
		};

	}
});


export const BotTweetDelete = new ValidatedMethod({
	name: 'Bots.methods.tweet.delete',
	validate: new SimpleSchema({
		botId: { type: String, regEx: SimpleSchema.RegEx.Id },
		tweetId: { type: String, regEx: SimpleSchema.RegEx.Id }
	}).validator({clean:true}),
	mixins: [RateLimiterMixin],
	rateLimit: config.METHODS.RATE_LIMIT.FAST,
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ botId, tweetId }) {
		if(!Meteor.userId()){
			const errors = [{
				name: 'login',
				type: 'needed'
			}];
			throw new ValidationError(errors);
		}
		if(!Meteor.user().roles.includes("admin")){
			const errors = [{
				name: 'admin',
				type: 'needed'
			}];
			throw new ValidationError(errors);
		}
		const bot = Bots.findOne({model : true, _id : botId, 'tweets' : { $elemMatch : { _id : tweetId}}})
		if(!bot){
			const errors = [{
				name: 'bot-model',
				type: 'needed'
			}];
			throw new ValidationError(errors);
		}
		
		Bots.update({
		 _id : botId
		}, {
			$set : {
				tweets : bot.tweets.filter(function(tweet){
					return tweet._id != tweetId;
				})
			}
		});
		
		return {
			success : true,
			message : "Tweet deleted"
		};

	}
});