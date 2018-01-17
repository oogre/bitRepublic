import { Meteor } from 'meteor/meteor';

if(Meteor.isServer){
	Meteor.methods({
		'users.create' : function(data){
			
			console.log(data);

			let userId =  Accounts.createUser(data);

			Accounts.sendEnrollmentEmail(userId);
			return userId;
		}
	})
}