/*----------------------------------------*\
  bitRepublic - bots.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-26 23:09:20
  @Last Modified time: 2018-02-15 16:56:54
\*----------------------------------------*/
import { Mongo } from 'meteor/mongo';

import './publications.js';
import './restAPI.js';
import './methods.js';
import './startup.js';
import * as Utilities from '../../utilities.js';

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
	}).observeChanges({
		added(id, bot) {
			Utilities.warn("imports/api/bots/bots.js : "+"New bot created : Do not forget to call custom Twiter API for " + id);
			let user = Meteor.users.findOne(bot.owner, {
				fields : {
					emails : true,
					username  :true
				}
			});
		}
	});
}