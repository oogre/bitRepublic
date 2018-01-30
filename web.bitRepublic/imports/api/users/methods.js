import { Meteor } from 'meteor/meteor';
import { config } from '../../startup/config.js';


if(Meteor.isServer){
	Meteor.methods({

		'users.create' : function(data){
			new SimpleSchema({
				username: { type: String },
				profile: { type: Object },
				'profile.firstname': { type: String },
				'profile.lastname': { type: String },
				'profile.country': { type: String },
				'email': { type: String, regEx: SimpleSchema.RegEx.Email }
			}).validate(data);

			//data.password = process.env.USER_DEFAULT_PWD;
			
			let userId =  Accounts.createUser(data);
			
			Accounts.sendEnrollmentEmail(userId);
			return {
				success : true,
				message : "User updated",
				data : userId
			};
		},
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