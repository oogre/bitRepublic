import { Meteor } from 'meteor/meteor';
import { Bots } from './bots.js';
import { Schedules } from './bots.js';
import { Random } from 'meteor/random';
import fastLoremIpsum from 'fast-lorem-ipsum';//.fastLoremIpsum;

function randomTweet(){
	return {
		_id : Random.id(),
		content : _.shuffle(fastLoremIpsum.fastLoremIpsum("140c").split("")).join(""),
		schedules : Schedules.find({}, { 
						fields : {
							lvl : 0
						}
					}).fetch().filter(function(schedule){
						return Math.random() < 0.5;
					})
	}
}

Meteor.startup(() => {
	if(Meteor.isServer){
		
		if(Schedules.find({}).count() < 1){
			console.log(" INSERT SCHEDULES");
			Schedules.insert({
				content : "Never",
				value : "never",
				lvl : 0
			});
			Schedules.insert({
				content : "Once a minute",
				value : "every minute",
				lvl : 100
			});
			Schedules.insert({
				content : "Once an hour",
				value : "every hour",
				lvl : 200
			});
			Schedules.insert({
				content : "Once a day",
				value : "every day",
				lvl : 300
			});
			Schedules.insert({
				content : "Once a week",
				value : "every week",
				lvl : 400
			});
			Schedules.insert({
				content : "Once a month",
				value : "every month",
				lvl : 500
			});
		}

		if(Bots.find({model : true}).count() != 3){
			console.log(" INSERT BOTS MODEL");
			Bots.insert({
				model : true,
				title : [
					"be aware", 
					"Send your claim to the Prime Minister"
				],
				signup : true,
				picture : "IMG",
				target : "politics",
				description : "Send a tweet postcard to the Prime Minister",
				tweets : [
					randomTweet(),
					randomTweet(),
					randomTweet()
				]
			});
			Bots.insert({
				model : true,
				title : [
					"Claim a bitsoiltax",
					"Time to GAFAM to pay"
				],
				signup : true,
				picture : "IMG",
				target : "ceos",
				description : "Send a tweet postcard to the CEO's of the top ten netgiants",
				tweets : [
					randomTweet(),
					randomTweet(),
					randomTweet()]
			});
			Bots.insert({
				model : true,
				title : [
					"Join the bitsoil campain",
					"Invite your friends"
				],
				signup : false,
				picture : "IMG",
				counter : "type",
				target : "friends",
				description : "Send a tweet postcard to all your friends",
				tweets : [
					randomTweet(),
					randomTweet(),
					randomTweet()]
			});
		}
	}
});