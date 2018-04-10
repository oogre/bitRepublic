/*----------------------------------------*\
  bitRepublic - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-06 13:34:03
  @Last Modified time: 2018-04-09 22:53:31
\*----------------------------------------*/

import {Targets} from './targets.js';
import { config } from '../../startup/config.js';
import Tabletop from 'tabletop';

Meteor.startup(() => {
	if(Meteor.isServer){
		Tabletop.init({ 
			key: config.TARGET.SPREADSHEET,
			callback: Meteor.bindEnvironment(data => {
				data.filter(target => {
					return 	!_.isEmpty(target.type) && 
							!_.isEmpty(target.role) && 
							!_.isEmpty(target.name) && 
							!_.isEmpty(target.from) && 
							!_.isEmpty(target.twitter_account) && 
							(target.type == "company" || target.type == "state");
				}).map(target => {
					target.twitter_account = target.twitter_account.split(/, ?/g);
					return target;
				}).filter(target => {
					return 	!Targets.findOne({
								type : target.type,
								role : target.role,
								name : target.name,
								from : target.from,
								twitter_account : target.twitter_account
							});
				}).map(target => {
					Targets.insert({
						type : target.type,
						role : target.role,
						name : target.name,
						from : target.from,
						twitter_account : target.twitter_account
					});
				});
			}),
			simpleSheet: true 
		});
	}
});