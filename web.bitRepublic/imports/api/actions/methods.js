/*----------------------------------------*\
  bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 23:16:22
  @Last Modified time: 2018-02-02 00:07:18
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Actions } from '../actions/actions.js';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';


export const ToggleAction = new ValidatedMethod({
	name: 'Actions.methods.toggle',
	validate: new SimpleSchema({
		actionId: { type: String, regEx: SimpleSchema.RegEx.Id },
		setChecked: { type: Boolean },
	}).validator({clean:true}),
	mixins: [RateLimiterMixin],
	rateLimit: {
		numRequests: 5,
		timeInterval: 5000,
	},
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