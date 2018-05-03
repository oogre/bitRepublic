/*----------------------------------------*\
  bitRepublic - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 23:27:45
  @Last Modified time: 2018-05-03 11:21:33
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
			Schedules.insert({
				content : "Every "+(60 * 60)+" secs", // hour
				value : 60 * 60
			});
			Schedules.insert({
				content : "Every "+(60 * 60 * 24)+" secs", // day
				value : 60 * 60 * 24
			});
			Schedules.insert({
				content : "Every "+(60 * 60 * 24 * 7)+" secs",  // week
				value : 60 * 60 * 24 * 7
			});
			Schedules.insert({
				content : "Every "+(60 * 60 * 24 * 30)+" secs", // month
				value : 60 * 60 * 24 * 30
			});
			Schedules.insert({
				content : "Every "+(60 * 60 * 24 * 365)+" secs", // year
				value : 60 * 60 * 24 * 365
			});
			Schedules.insert({
				content : "Every "+(60 * 60 * 24 * 365 * 100)+" secs", // centuary
				value : 60 * 60 * 24 * 365 * 100
			});
		}

		if(Bots.find({model : true}).count() == 0){
			console.log(" INSERT BOTS MODEL");
			let schedule = Schedules.find({}, {
				fields : {
					lvl : 0
				}
			}).fetch();
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
					{
						_id : Random.id(),
						content : "Dear @PrimeMinister, heard of bitsoil? The new oil of the data economy. Make the data industry fair again. Support the https://bitsoil.tax/campaign, Love",
						schedules : schedule
					},
					{
						_id : Random.id(),
						content : "Dear @PrimeMinister, billions of tax money are lost every year on people’s data. Make the data industry great again! It’s time to net giants to pay their fair share. Love, https://bitsoil.tax/campaign",
						schedules : schedule
					},
					{
						_id : Random.id(),
						content : "Dear @PrimeMinister, make the data economy fair again. Citizens should receive a fair share in return for their data. Support the https://bitsoil.tax/campaign, Love",
						schedules : schedule
					},
					{
						_id : Random.id(),
						content : "Dear #Prime Minister, make the data economy benefits all. Support the https://bitsoil.tax/campaign, Yours faithfully",
						schedules : schedule
					},
					{
						_id : Random.id(),
						content : "Dear @Prime Minister, I hope this tweet postcard brightness your day. Join the https://bitsoil.tax/campaign.",
						schedules : schedule
					}
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
					{
						_id : Random.id(),
						content : "Dear @NetGiants, beware: taxbots are coming for you. You're not gonna like 'em! Love, https://bitsoil.tax/campaign",
						schedules : schedule
					},
					{
						_id : Random.id(),
						content : "Hi @NetGiants, and all world’s big net giants, it’s time to pay your fair share, Love, https://bitsoil.tax/campaign",
						schedules : schedule
					},
					{
						_id : Random.id(),
						content : "Dear @NetGiants, citizens should receive a fair share in return for their data. Taxbots are coming for you. You're gonna like 'em! Love, https://bitsoil.tax/campaign",
						schedules : schedule
					},
					{
						_id : Random.id(),
						content : "Dear @NetGiants, beware: Taxbots are coming for you. Citizens should receive a fair share in return for their data, Love, https://bitsoil.tax/campaign",
						schedules : schedule
					},
					{
						_id : Random.id(),
						content : "Hi @NetGiants, taxbots are coming for you! You're not gonna like 'em!",
						schedules : schedule
					},
					{
						_id : Random.id(),
						content : "Hi @NetGiants, taxbots are coming for you! You're gonna like 'em! Love, https://bitsoil.tax/campaign",
						schedules : schedule
					}
				]
			});
			Bots.insert({
				model : true,
				title : [
					"Join the bitsoil campaign",
					"Invite your friends"
				],
				signup : false,
				picture : "/images/bots/bot-friends.gif",
				counter : "type",
				target : "friends",
				description : "Send a tweet postcard to all your friends",
				tweets : [
					{
						_id : Random.id(),
						content : "Dear @Friend, heard of bitsoil? The new oil of the data economy. You could be cashing in too. Claim your share. Join the https://bitsoil.tax/campaign",
						schedules : schedule
					},{
						_id : Random.id(),
						content : "Dear @Friend, Twitter is making money of your tweets. Claim your share. Join the https://bitsoil.tax/campaign",
						schedules : schedule
					},{
						_id : Random.id(),
						content : "Dear @Friend, join the BitSoil Popup Tax & Hack Campaign. Act now, ask your Prime Minister to support the https://bitsoil.tax/campaign",
						schedules : schedule
					},{
						_id : Random.id(),
						content : "Dear @Friend, act now, ask your Prime Minister to support the https://bitsoil.tax/campaign",
						schedules : schedule
					},{
						_id : Random.id(),
						content : "Dear @Friend, greetings from the https://bitsoil.tax/campaign",
						schedules : schedule
					}
				]
			});
		}
	}
});
