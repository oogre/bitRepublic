import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Bots } from '../bots/bots.js';
import { Actions } from '../actions/actions.js';

Meteor.methods({
	/**
	* @api {Meteor.call} /api/bots/create
	* @apiName bots.create
	* @apiGroup Private
	*
	* @apiDescription Call Meteor.call('bots.create' ... to create bot
	* the user has to be loged-in
	*
	* @apiSuccess {String} Bots._id the _id of the newly created bot
	*/
	'actions.toggle' : function(actionId, setChecked){
		check(actionId, String);
		check(setChecked, Boolean);

		if(!Meteor.user()){
			throw new Meteor.Error('not-authorized');
		}

		Actions.update({
			_id : actionId
		}, {
			$set : {
				active : setChecked
			}
		});
	}
});
