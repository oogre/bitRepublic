/*----------------------------------------*\
  bitRepublic - actions.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-28 18:14:59
  @Last Modified time: 2018-02-15 11:41:36
\*----------------------------------------*/
import { Mongo } from 'meteor/mongo';

import './methods.js';
import './engin.js';

import { Bots } from '../bots/bots.js';

export const Actions = new Mongo.Collection('actions');

Actions.find({}).observe({
	changed(newAction, oldAction) {
		if(newAction.active != oldAction.active){
			let bot = Bots.findOne({_id : newAction.bot});
			if(!bot)return;
			let botActive = _.chain(
								Actions.find({
									_id : { 
										$in : bot.actions 
									}
								}).fetch()
							).pluck("active").some().value();
			if(botActive != bot.active){
				Bots.update({
					_id : bot._id
				}, {
					$set : {
						active : botActive
					}
				});
			}
		}
	}
});
