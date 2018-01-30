import { Meteor } from 'meteor/meteor';
import { config } from '../../startup/config.js';




export const CreateUser = new ValidatedMethod({
	name: 'Users.methods.create',
	validate: new SimpleSchema({
		'firstname': { type: String },
		'lastname': { type: String },
		'country': { type: String },
		'email': { type: String, regEx: SimpleSchema.RegEx.Email }
	}).validator({clean:true}),
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ firstname, lastname, email, country }) {
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
					lastname,
					country
				}
			});
			Accounts.sendEnrollmentEmail(userId);
			return {
				success : true,
				message : "Your account is up to be created \nYou'll receive soon an email to complete your subscription.",
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
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ email }) {

	}
});



if(Meteor.isServer){
	Meteor.methods({
		'users.resetPassord' : function(){
			Accounts.sendResetPasswordEmail(Meteor.userId());
			return {
				success : true,
				message : "Mail send",
				data : Meteor.userId()
			};
		},
		
		'users.setAvatar' : function(avatarId){
			new SimpleSchema({
				avatarId: { type: String, regEx: SimpleSchema.RegEx.Id }
			}).validate({
				avatarId
			});

			Meteor.users.update({
				_id: Meteor.userId()
			},{
				$set : {
					'profile.avatar' : avatarId
				}
			});

			return {
				success : true,
				message : "User updated"
			};
		},
		'users.update' : function(data){
			new SimpleSchema({
				username: { type: String },
				profile: { type: Object },
				'profile.firstname': { type: String },
				'profile.lastname': { type: String },
				emails: { type: Array },
				'emails.$': { type: Object },
				'emails.$.address': { type: String, regEx: SimpleSchema.RegEx.Email }
			}).validate(data);

			data['profile.firstname'] = data.profile.firstname;
			data['profile.lastname'] = data.profile.lastname;
			delete data.profile;
			
			if(Meteor.users.find({
				_id : {
					$ne : Meteor.userId()
				},
				'emails.address' : data.emails[0].address
			}).count() > 0){
				throw new Meteor.Error("validation-error", 'This email is already recorded', 'email');
			}

			if(Meteor.users.find({
				_id : {
					$ne : Meteor.userId()
				},
				'username' : data.username
			}).count() > 0){
				throw new Meteor.Error("validation-error", 'This username is already taken', 'username');
			}
			
			Meteor.users.update({
				_id: Meteor.userId()
			},{
				$set : data
			});

			return {
				success : true,
				message : "User updated"
			};
		},
		'users.update.pwd' : function(data){
			new SimpleSchema({
				oldPassword: { type: String },
				newPassword: { type: String, min: config.PWD_LENGTH.MIN, max: config.PWD_LENGTH.MAX }
			}).validate(data);

			console.log(data);
		}
	})
}