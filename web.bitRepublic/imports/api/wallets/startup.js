import { Meteor } from 'meteor/meteor';
import { Wallets } from './wallets.js';
import {config} from '../../startup/config.js';

Meteor.startup(() => {
	if(Meteor.isServer){
		if(!Wallets.findOne({ type : config.WALLET_TYPE.PUBLIC, owner : { $exists:false } })){
			Wallets.insert({
				createdAt : new Date(),
				type : config.WALLET_TYPE.PUBLIC,
				bitsoil : 0
			});
		}
	}
});