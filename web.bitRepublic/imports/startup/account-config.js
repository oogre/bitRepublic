/*----------------------------------------*\
  bitRepublic - account-config.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 01:13:47
  @Last Modified time: 2018-11-06 23:46:29
\*----------------------------------------*/
import React from 'react';
import { render } from 'react-dom';

import { Accounts } from 'meteor/accounts-base';
import UserPasswordSetup from './../ui/user/passwordSetup.js'

import T from './../i18n/index.js';

if(Meteor.isServer){
	Accounts.emailTemplates.siteName = 'bitsoil.tax';
	Accounts.emailTemplates.from = 'bitsoil tax campaign <noreply@bitsoil.tax>';
	Accounts.emailTemplates.enrollAccount = {
		subject(user) {
			return i18n.createTranslator("Mail")("enrollAccount.subject").replace("[USER_FIRSTNAME]", user.profile.firstname);
		},
		text(user, url) {
			return i18n.createTranslator("Mail")("enrollAccount.message").replace("[USER_FIRSTNAME]", user.profile.firstname).replace("[URL]", url);
		}
	};

	Accounts.emailTemplates.siteName = 'bitsoil.tax';
	Accounts.emailTemplates.from = 'bitsoil tax campaign <noreply@bitsoil.tax>';
	Accounts.emailTemplates.resetPassword = {
		subject(user) {
			return i18n.createTranslator("Mail")("resetPassword.subject").replace("[USER_FIRSTNAME]", user.profile.firstname);
		},
		text(user, url) {
			return i18n.createTranslator("Mail")("resetPassword.message").replace("[USER_FIRSTNAME]", user.profile.firstname).replace("[URL]", url);
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
				FlowRouter.reload();
			};
			render(<UserPasswordSetup token={token} onComplete={onComplete}/>, document.getElementById('render-target'));
		}, 100);
	});
}
