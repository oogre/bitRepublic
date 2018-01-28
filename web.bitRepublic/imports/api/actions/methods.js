import { Meteor } from 'meteor/meteor';

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
		new SimpleSchema({
			actionId: { type: String, regEx: SimpleSchema.RegEx.Id },
			setChecked: { type: Boolean },
		}).validate({
			actionId, 
			setChecked
		});

		if(!Meteor.user()){
			throw new Meteor.Error("validation-error", 'You need to bo login to perform this action');
		}

		Actions.update({
			_id : actionId
		}, {
			$set : {
				active : setChecked
			}
		});

		return {
			success : true,
			message : "Action updated"
		};
	}
});
