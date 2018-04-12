import { Data } from './data.js';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';


export const SaveData = new ValidatedMethod({
	name: 'save.data',
	validate: new SimpleSchema({
		type : { type: String },
		value : { type: String, optional: true }
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
		noRetry: false,
	},
	run({ type, value }) {
		if (!this.isSimulation) {
			if(!Meteor.userId()){
				const errors = [{
					name: 'login',
					type: 'needed'
				}];
				throw new ValidationError(errors);
			}
			if(!Meteor.user().roles.includes("admin")){
				const errors = [{
					name: 'admin',
					type: 'needed'
				}];
				throw new ValidationError(errors);
			}
			if(!Data.findOne({ type : type })){
				const errors = [{
					name: 'data.type : '+type,
					type: 'unknown'
				}];
				throw new ValidationError(errors);
			}
		
			if(_.isEmpty(value)){
				Data.update({
					type : type
				}, {
					$unset : {
						value : null
					}
				});
			}else{
				Data.update({
					type : type
				}, {
					$set : {
						value : value
					}
				});
			}
			
		

			return {
				success : true
			};
		}
	}
});