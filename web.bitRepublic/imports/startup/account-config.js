import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
	passwordSignupFields : 'USERNAME_ONLY'
});
/*
//Accounts.emailTemplates.siteName = 'bitRepublic';
Accounts.emailTemplates.from = 'bitRepublic <no-reply@ogre.be>';
Accounts.emailTemplates.enrollAccount = {
	subject(user) {
		return `Welcome to bitRepublic, ${user.profile.name}`;
	},
	text(user, url) {
		return `Hey ${user}! Create your password and login by following this link: ${url}`;
	}
};
Accounts.emailTemplates.resetPassword = {
	subject(user) {
		return `Password Reset to bitRepublic, ${user.profile.name}`;
	},
	text(user, url) {
		return `Hey ${user}! Reset your password by following this link: ${url}`;
	}
};

Accounts.onEnrollmentLink((token, done)=>{
	console.log(token);
	done()
});
*/