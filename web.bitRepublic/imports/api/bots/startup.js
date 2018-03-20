/*----------------------------------------*\
  bitRepublic - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 23:27:45
  @Last Modified time: 2018-03-20 15:25:11
\*----------------------------------------*/
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
			/*Schedules.insert({
				content : "Never",
				value : 0
			});
			Schedules.insert({
				content : "Once a minute",
				value : 60 // 60 sec
			});
			Schedules.insert({
				content : "Once an hour",
				value : 60 * 60
			});*/
			Schedules.insert({
				content : "Once a day",
				value : 60 * 60 * 24
			});
			Schedules.insert({
				content : "Once a week",
				value : 60 * 60 * 24 * 7
			});
			Schedules.insert({
				content : "Once a month",
				value : 60 * 60 * 24 * 30
			});
			Schedules.insert({
				content : "Once a year",
				value : 60 * 60 * 24 * 30 * 365
			});
			Schedules.insert({
				content : "Once a centuary",
				value : 60 * 60 * 24 * 30 * 365 * 100
			});
			Schedules.insert({
				content : "Once a millenium",// exprimé en seconde + countdown
				value : 60 * 60 * 24 * 30 * 365 * 1000
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
				picture : "/images/bots/bot-pm.gif",
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
					"Time to net giants to pay"
				],
				signup : true,
				picture : "/images/bots/bot-gafam.gif",
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
				picture : "/images/bots/bot-friends.gif",
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
