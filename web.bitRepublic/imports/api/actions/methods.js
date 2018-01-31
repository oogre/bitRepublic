import { Meteor } from 'meteor/meteor';
import { Actions } from '../actions/actions.js';

export const ToggleAction = new ValidatedMethod({
	name: 'Actions.methods.toggle',
	validate: new SimpleSchema({
		actionId: { type: String, regEx: SimpleSchema.RegEx.Id },
		setChecked: { type: Boolean },
	}).validator({clean:true}),
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ actionId, setChecked }) {
		if(!Meteor.userId()){
			const errors = [{
				name: 'login',
				type: 'needed'
			}];
			throw new ValidationError(errors);
		}
		if(!Actions.findOne(actionId)){
			const errors = [{
				name: 'action',
				type: 'needed'
			}];
			throw new ValidationError(errors);
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