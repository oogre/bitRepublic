/*----------------------------------------*\
  bitRepublic - bots.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-26 23:09:20
  @Last Modified time: 2018-02-14 17:38:00
\*----------------------------------------*/
import { Mongo } from 'meteor/mongo';

import './publications.js';
import './restAPI.js';
import './methods.js';
import './startup.js';

export const Bots = new Mongo.Collection('bots');

export const Schedules = new Mongo.Collection('schedules');

if(Meteor.isServer){
	Bots.find({
		model : { $ne : true },
		owner : { $exists : true }
	},{
		fields : {
			owner : true
		}
	}).observe({
		added(bot) {
			console.warn("imports/api/bots/bots.js : "+"New bot created : Do not forget to call custom Twiter API for '" + bot._id + "'");
			let user = Meteor.users.findOne(bot.owner, {
				fields : {
					emails : true,
					username  :true
				}
			});
		}
	});
}