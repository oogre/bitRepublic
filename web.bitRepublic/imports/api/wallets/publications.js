/*----------------------------------------*\
  bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-02 00:02:50
  @Last Modified time: 2018-02-02 00:04:58
\*----------------------------------------*/

import { Meteor } from 'meteor/meteor';
import { Wallets } from './wallets.js';
import {config} from '../../startup/config.js';

if(Meteor.isServer){
	Meteor.publish('public.wallet', function publicWalletPublication(){
		return Wallets.find({ type : config.WALLET_TYPE.PUBLIC, owner : { $exists:false } });
	});

	Meteor.publish('my.wallet', function myWalletPublication(){
		return Wallets.find({ type : config.WALLET_TYPE.PERSONNAL, owner : this.userId });
	});

	Meteor.publish('all.wallet', function myWalletPublication(){
		return Wallets.find({ $or : [{
				type : config.WALLET_TYPE.PERSONNAL
			}, {
				type : config.WALLET_TYPE.PUBLIC, 
				owner : { $exists:false }
			}]
		});
	});
}