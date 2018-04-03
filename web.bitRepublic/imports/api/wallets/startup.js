/*----------------------------------------*\
  bitRepublic - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-02 00:02:53
  @Last Modified time: 2018-04-03 13:56:35
\*----------------------------------------*/

import { Meteor } from 'meteor/meteor';
import { Wallets } from './wallets.js';
import {config} from '../../startup/config.js';
import * as Utilities from '../../utilities.js';

Meteor.startup(() => {
	if(Meteor.isServer){
		if(!Wallets.findOne({ type : config.WALLET_TYPE.PUBLIC, owner : { $exists:false } })){
			Wallets.insert({
				createdAt : new Date(),
				updatedAt : new Date(),
				type : config.WALLET_TYPE.PUBLIC,
				bitsoil : 0,
				key : Utilities.genPrivateKey(),
				publicKey : Utilities.genPubKey()
			});
			console.log("PUBLIC WALLET CREATED");
		}

		if(!Wallets.findOne({ type : config.WALLET_TYPE.CONSUME, owner : { $exists:false } })){
			Wallets.insert({
				createdAt : new Date(),
				updatedAt : new Date(),
				type : config.WALLET_TYPE.CONSUME,
				publicKeys : [],
				bitsoilToConsume : [],
				key : Utilities.genPrivateKey(),
				publicKey : Utilities.genPubKey()
				
			});
			console.log("CONSUME WALLET CREATED");
		}

		
	}
});