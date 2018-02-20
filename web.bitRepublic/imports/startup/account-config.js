/*----------------------------------------*\
  bitRepublic - account-config.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 01:13:47
  @Last Modified time: 2018-02-20 14:47:30
\*----------------------------------------*/
import React from 'react';
import { render } from 'react-dom';

import { Accounts } from 'meteor/accounts-base';
import UserPasswordSetup from './../ui/user/passwordSetup.js'

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


}else{
	Accounts.onEnrollmentLink((token, done) => {
		Meteor.setTimeout(() => {
			const onComplete = () => {
				done();
				FlowRouter.go('home');
			};
			render(<UserPasswordSetup token={token} onComplete={onComplete}/>, document.getElementById('render-target'));
		}, 100);
	});

	Accounts.onResetPasswordLink((token, done) => {
		Meteor.setTimeout(() => {
			const onComplete = () => {
				done();
				FlowRouter.go('home');
			};
			render(<UserPasswordSetup token={token} onComplete={onComplete}/>, document.getElementById('render-target'));
		}, 100);
	});
}
