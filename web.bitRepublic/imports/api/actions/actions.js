/*----------------------------------------*\
  bitRepublic - actions.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-28 18:14:59
  @Last Modified time: 2018-02-15 16:28:10
\*----------------------------------------*/
import { Mongo } from 'meteor/mongo';

import './methods.js';
import './engin.js';

import { Bots } from '../bots/bots.js';

export const Actions = new Mongo.Collection('actions');

Actions.find({

}, {
	fields:{
		active : true, 
		bot: true
	}
}).observe({
	changed(action) {
		Bots.update({
			_id : action.bot
		}, {
			$set : {
				active : _.chain(
						Actions.find({
							bot : action.bot
						},{
							fields : {
								_id : false,
								active : true
							}
						}).fetch()).pluck("active").some().value()
			}
		});
	}
});
