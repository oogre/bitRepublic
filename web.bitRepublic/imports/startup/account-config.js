/*----------------------------------------*\
  bitRepublic - account-config.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 01:13:47
  @Last Modified time: 2018-04-23 20:42:01
\*----------------------------------------*/
import React from 'react';
import { render } from 'react-dom';

import { Accounts } from 'meteor/accounts-base';
import UserPasswordSetup from './../ui/user/passwordSetup.js'

if(Meteor.isServer){
	Accounts.emailTemplates.siteName = 'bitsoil.tax';
	Accounts.emailTemplates.from = 'bitsoil tax campaign <noreply@bitsoil.tax>';
	Accounts.emailTemplates.enrollAccount = {
		subject(user) {
			return `Welcome to the bitsoil tax campaign, ${user.profile.firstname}`;
		},
		text(user, url) {
			console.log(user);
			console.log(url);
			return `Hey ${user.profile.firstname}! Create your password and login by following this link: ${url}`;
		}
	};

	Accounts.emailTemplates.siteName = 'bitsoil.tax';
	Accounts.emailTemplates.from = 'bitsoil tax campaign <noreply@bitsoil.tax>';
	Accounts.emailTemplates.resetPassword = {
		subject(user) {
			return `Password reset to the bitsoil tax campaign, ${user.profile.firstname}`;
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
				FlowRouter.reload();
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
