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
				tweets : [{
					_id : 0,
					content : "tweetA0",
					schedules : [{
						content : "Never",
						value : "never"
					},{
						content : "Once an hour",
						value : "every hour"
					},{
						content : "Once a week",
						value : "every week"
					},{
						content : "Once a month",
						value : "every month"
					}]
				},{
					_id : 1,
					content : "tweetA1",
					schedules : [{
						content : "Never",
						value : "never"
					},{
						content : "Once an hour",
						value : "every hour"
					},{
						content : "Once a week",
						value : "every week"
					},{
						content : "Once a month",
						value : "every month"
					}]
				},{
					_id : 2,
					content : "tweetA2",
					schedules : [{
						content : "Never",
						value : "never"
					},{
						content : "Once an hour",
						value : "every hour"
					},{
						content : "Once a week",
						value : "every week"
					},{
						content : "Once a month",
						value : "every month"
					}]
				}]
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
				tweets : [{
					_id : 0,
					content : "tweetB0",
					schedules : [{
						content : "Never",
						value : "never"
					},{
						content : "Once an hour",
						value : "every hour"
					},{
						content : "Once a week",
						value : "every week"
					},{
						content : "Once a month",
						value : "every month"
					}]
				},{
					_id : 1,
					content : "tweetB1",
					schedules : [{
						content : "Never",
						value : "never"
					},{
						content : "Once an hour",
						value : "every hour"
					},{
						content : "Once a week",
						value : "every week"
					},{
						content : "Once a month",
						value : "every month"
					}]
				},{
					_id : 2,
					content : "tweetB2",
					schedules : [{
						content : "Never",
						value : "never"
					},{
						content : "Once an hour",
						value : "every hour"
					},{
						content : "Once a week",
						value : "every week"
					},{
						content : "Once a month",
						value : "every month"
					}]
				}]
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
				tweets : [{
					_id : 0,
					content : "tweetC0",
					schedules : [{
						content : "Never",
						value : "never"
					},{
						content : "Once an hour",
						value : "every hour"
					},{
						content : "Once a week",
						value : "every week"
					},{
						content : "Once a month",
						value : "every month"
					}]
				},{
					_id : 1,
					content : "tweetC1",
					schedules : [{
						content : "Never",
						value : "never"
					},{
						content : "Once an hour",
						value : "every hour"
					},{
						content : "Once a week",
						value : "every week"
					},{
						content : "Once a month",
						value : "every month"
					}]
				},{
					_id : 2,
					content : "tweetC2",
					schedules : [{
						content : "Never",
						value : "never"
					},{
						content : "Once an hour",
						value : "every hour"
					},{
						content : "Once a week",
						value : "every week"
					},{
						content : "Once a month",
						value : "every month"
					}]
				}]
			});
		}
	}
});