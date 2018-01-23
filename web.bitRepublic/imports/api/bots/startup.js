import { Meteor } from 'meteor/meteor';
import { Bots } from './bots.js';

Meteor.startup(() => {
	if(Meteor.isServer){
		if(Bots.find().count() == 0){
			console.log(" INSERT BOTS MODEL");
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
			Bots.insert({
				model : true,
				title : [
					"Claim a bitsoiltax",
					"Time to GAFAM to pay"
				],
				picture : "IMG",
				target : "ceos",
				description : "Send a tweet postcard to the CEO's of the top ten netgiants",
				tweets : [
					"tweetB0",
					"tweetB1",
					"tweetB2",
				]
			});
			Bots.insert({
				model : true,
				title : [
					"Join the bitsoil campain",
					"Invite your friends"
				],
				picture : "IMG",
				counter : "type",
				target : "friends",
				description : "Send a tweet postcard to all your friends",
				tweets : [
					"tweetC0",
					"tweetC1",
					"tweetC2",
				]
			});
		}
	}
});