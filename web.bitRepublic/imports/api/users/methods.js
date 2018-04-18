/*----------------------------------------*\
  bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 23:17:42
  @Last Modified time: 2018-04-18 12:08:25
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { config } from '../../startup/config.js';
import { Images } from '../images/images.js';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';


export const UserContact  = new ValidatedMethod({
	name: 'User.methods.contact',
	validate: new SimpleSchema({
		'name': { type: String },
		'email': { type: String, regEx: SimpleSchema.RegEx.Email},
		'subject': { type: String },
		'message': { type: String},
		'newsletterChecked' : {type: Boolean, optional: true}
	}).validator({clean:true}),
	mixins: [RateLimiterMixin],
	rateLimit: config.METHODS.RATE_LIMIT.SLOW,
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ name, email, subject, message, newsletterChecked }) {
		console.log(name, email, subject, message, newsletterChecked);
		if (!this.isSimulation) {

			message += newsletterChecked ? "\nPS : I want to checkin to the nwesletter." : "";

			Email.send({
				from : email,
				to : process.env.CONTACT,
				subject : "BIT REPUBLIC : " + subject,
				text : message
			});

			return {
				success : true,
				message : "Your massage has been sent."
			};
		}
	}
});

export const CreateUser = new ValidatedMethod({
	name: 'Users.methods.create',
	validate: new SimpleSchema({
		'firstname':{ type: String },
		'lastname':	{ type: String },
		'email':	{ type: String, regEx: SimpleSchema.RegEx.Email }
	}).validator({clean:true}),
	mixins: [RateLimiterMixin],
	rateLimit: config.METHODS.RATE_LIMIT.FAST,
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ firstname, lastname, email }) {
		if (!this.isSimulation) {
			if(Meteor.users.find({'emails.address':new RegExp(email, "i")}).count() > 0){
				const errors = [{
					name: 'email',
					type: 'already-exists',
					details: {
						value: email
					}
				}];
				throw new ValidationError(errors);
			}

			let defaultUsername = firstname + "." + lastname;
			let countHomonym = 	Meteor.users.find({
									$or : [{
										'profile.firstname':new RegExp(firstname, "i"),
										'profile.lastname':new RegExp(lastname, "i")
									},{
										username : new RegExp('^' + defaultUsername, 'i')
									}]
								}).count();

			if(countHomonym > 0){
				defaultUsername += "."+countHomonym;
			}

			let userId =  Accounts.createUser({
				username : defaultUsername,
				email : email,
				profile : {
					firstname,
					lastname
				}
			});
			Accounts.sendEnrollmentEmail(userId);
			return {
				success : true,
				message : "Your account is up to be created. You'll receive soon an email to complete your subscription.",
				data : userId
			};
		}
	}
});


export const LoginUser = new ValidatedMethod({
	name: 'Users.methods.login',
	validate: new SimpleSchema({
		'email': { type: String, regEx: SimpleSchema.RegEx.Email },
		'password': { type: String }
	}).validator({clean:true}),
	mixins: [RateLimiterMixin],
	rateLimit: config.METHODS.RATE_LIMIT.SUPERFAST,
	
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ email, password }) {

	}
});


export const ForgotPassword = new ValidatedMethod({
	name: 'Users.methods.forgot.password',
	validate: new SimpleSchema({
		'email': { type: String, regEx: SimpleSchema.RegEx.Email }
	}).validator({clean:true}),
	mixins: [RateLimiterMixin],
	rateLimit: config.METHODS.RATE_LIMIT.SLOW,
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ email }) {

	}
});


export const ResetPassword = new ValidatedMethod({
	name: 'Users.methods.reset.password',
	validate: new SimpleSchema({
	}).validator({clean:true}),
	mixins: [RateLimiterMixin],
	rateLimit: config.METHODS.RATE_LIMIT.SLOW,
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ }) {
		if(!Meteor.userId()){
			const errors = [{
				name: 'login',
				type: 'needed'
			}];
			throw new ValidationError(errors);
		}
		if (!this.isSimulation) {
			Accounts.sendResetPasswordEmail(Meteor.userId());
			return {
				success : true,
				message : "You'll receive soon an email to reset your password.",
			};
		}
	}
});


export const UserSetAvatar = new ValidatedMethod({
	name: 'Users.methods.avatar',
	validate: new SimpleSchema({
		'avatarId' : {type: String, regEx: SimpleSchema.RegEx.Id }
	}).validator({clean:true}),
	mixins: [RateLimiterMixin],
	rateLimit: config.METHODS.RATE_LIMIT.SLOW,
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ avatarId }) {
		if(!Meteor.userId()){
			const errors = [{
				name: 'login',
				type: 'needed'
			}];
			throw new ValidationError(errors);
		}
		if (!this.isSimulation) {
			let avatar = Images.findOne({
				_id : avatarId,
				userId : Meteor.userId()
			});

			if(!avatar){
				const errors = [{
					name: 'avatar',
					type: 'needed'
				}];
				throw new ValidationError(errors);
			}

			Meteor.users.update({
				_id: Meteor.userId()
			},{
				$set : {
					'profile.avatar' : avatarId
				}
			});

			return {
				success : true,
				message : "Your picture is setup as avatar.",
			};
		}
	}
});


export const UpdateUser = new ValidatedMethod({
	name: 'Users.methods.update',
	validate: new SimpleSchema({
		username: { type: String },
		firstname: { type: String },
		lastname: { type: String },
		email: { type: String, regEx: SimpleSchema.RegEx.Email }
	}).validator({clean:true}),
	mixins: [RateLimiterMixin],
	rateLimit: config.METHODS.RATE_LIMIT.FAST,
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ username, firstname, lastname, email }) {
		if(!Meteor.userId()){
			const errors = [{
				name: 'login',
				type: 'needed'
			}];
			throw new ValidationError(errors);
		}
		if (!this.isSimulation) {
			if(Meteor.users.findOne({
				_id : {
					$ne : Meteor.userId()
				},
				'emails.address' : new RegExp(email, "i"),
			})){
				const errors = [{
					name: 'email',
					type: 'already-exists'
				}];
				throw new ValidationError(errors);
			}

			if(Meteor.users.findOne({
				_id : {
					$ne : Meteor.userId()
				},
				'username' : new RegExp(username, "i"),
			})){
				const errors = [{
					name: 'username',
					type: 'already-exists'
				}];
				throw new ValidationError(errors);
			}

			Meteor.users.update({
				_id: Meteor.userId()
			},{
				$set : {
					username : username,
					profile : {
						firstname : firstname,
						lastname : lastname,
					},
					emails : [{
						address : email,
					}]
				}
			});
			return {
				success : true,
				message : "Your account is updated."
			};
		}
	}
});