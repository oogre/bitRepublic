import { Meteor } from 'meteor/meteor';
import { Wallets } from './wallets.js';
import {config} from '../../startup/config.js';

if(Meteor.isServer){
	Meteor.publish('public.wallet', function publicWalletPublication(){
		return Wallets.find({ type : config.WALLET_TYPE.PUBLIC, owner : { $exists:false } });
	});

	Meteor.publish('my.wallet', function myWalletPublication(){
		return Wallets.find({ type : config.WALLET_TYPE.PERSONNAL, owner : Meteor.userId() });
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