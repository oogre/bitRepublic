import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

if(Meteor.isServer){
	Meteor.methods({
		/**
		* @api {Meteor.call} /api/user/create
		* @apiName users.create
		* @apiGroup Private
		*
		* @apiDescription Call Meteor.call('users.create' ... to create user
		* an email is sent to the user, by folling the link inside the email
		* he setups his password.  
		*
		* @apiParam {Object} 
		* @apiParam {String} Object.username
		* @apiParam {String} Object.email
		* @apiParam {Object} Object.profile
		* @apiParam {String} Object.profile.firstname
		* @apiParam {String} Object.profile.lastname
		* @apiParam {String} Object.profile.country
		*
		* @apiSuccess {String} Users._id  the _id of the newly created User
		*/
		'users.create' : function(data){
			check(data.username, String);
			check(data.email, String);
			check(data.profile, Object);
			check(data.profile.firstname, String);
			check(data.profile.lastname, String);
			check(data.profile.country, String);
			data.password = process.env.USER_DEFAULT_PWD;
			let userId =  Accounts.createUser(data);

			//Accounts.sendEnrollmentEmail(userId);
			return userId;
		}
	})
}