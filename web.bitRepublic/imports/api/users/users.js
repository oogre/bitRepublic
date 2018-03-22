/*----------------------------------------*\
  bitRepublic - users.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 14:14:05
  @Last Modified time: 2018-03-20 15:18:38
\*----------------------------------------*/
import './methods.js';
import './publications.js';
import './startup.js';

import { Random } from 'meteor/random';

import {Wallets} from '../wallets/wallets.js';
import {config} from '../../startup/config.js';



if(Meteor.isServer){
	const personnalWalletReq = {
		type : config.WALLET_TYPE.PERSONNAL,
		owner : { $exists:true}
	};
	Meteor.users.find({}).observeChanges({
		added(id, user) {
			if(!user.roles || !user.roles.includes("user")){
				Roles.addUsersToRoles(id, ['user']);
				console.log("Roles attributed to '" + user.username + "' is 'user'");
			}
			if(Wallets.find({$and : [{owner : id},personnalWalletReq]}).count() > 0) return;

			let walletId = Wallets.insert({
				createdAt : new Date(),
				updatedAt : new Date(),
				type : config.WALLET_TYPE.PERSONNAL,
				owner : id,
				bitsoil : 0,
				key : Random.hexString(64),
				number : (Wallets.find({
					type : config.WALLET_TYPE.PERSONNAL, 
					owner : { $exists:true }
				}).count() + 1)
			});
			Meteor.users.update({
				_id : id
			}, {
				$set : {
					wallet : walletId
				}
			});
			console.log("Wallet created for '" + user.username + "' has id : '" + walletId + "'");
		},
		removed(id, user) {
			Wallets.remove({owner : id});
		}
	});
}