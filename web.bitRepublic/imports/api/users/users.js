/*----------------------------------------*\
  bitRepublic - users.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 14:14:05
  @Last Modified time: 2018-02-05 18:07:15
\*----------------------------------------*/
import './methods.js';
import './publications.js';
import './startup.js';
import './restAPI.js';

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
			}


			if(Wallets.find({$and : [{owner : id},personnalWalletReq]}).count() > 0) return;
			console.log("create wallet for "+user.username);
			let walletId = Wallets.insert({
				createdAt : new Date(),
				updatedAt : new Date(),
				type : config.WALLET_TYPE.PERSONNAL,
				owner : id,
				bitsoil : 0,
				number : (Wallets.find(personnalWalletReq).count() + 1)
			});
			Meteor.users.update({
				_id : id
			}, {
				$set : {
					wallet : walletId
				}
			})
		},
		removed(id) {
			Wallets.remove({owner : id});
		}
	});
}