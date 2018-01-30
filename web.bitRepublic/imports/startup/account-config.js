import { Accounts } from 'meteor/accounts-base';
if(Meteor.isServer){
	Accounts.emailTemplates.siteName = 'bitRepublic';
	Accounts.emailTemplates.from = 'bitRepublic <no-reply@ogre.be>';
	Accounts.emailTemplates.enrollAccount = {
		subject(user) {
			return `Welcome to bitRepublic, ${user.profile.firstname}`;
		},
		text(user, url) {
			return `Hey ${user.profile.firstname}! Create your password and login by following this link: ${url}`;
		}
	};

	Accounts.emailTemplates.siteName = 'bitRepublic';
	Accounts.emailTemplates.from = 'bitRepublic <no-reply@ogre.be>';
	Accounts.emailTemplates.resetPassword = {
		subject(user) {
			return `Password Reset to bitRepublic, ${user.profile.firstname}`;
		},
		text(user, url) {
			return `Hey ${user.profile.firstname}! Reset your password by following this link: ${url}`;
		}
	};
}