import { Mongo } from 'meteor/mongo';

import './publications.js';
import './restAPI.js';
import './methods.js';
import './startup.js';

import {config} from '../../startup/config.js';


export const Wallets = new Mongo.Collection('wallets');
export const TempWallets = new Mongo.Collection(null);


if(Meteor.isServer){
	const cursor = Meteor.users.find({});
	const handle = cursor.observeChanges({
		added(id, user) {
			let walletId = Wallets.insert({
				createdAt : new Date(),
				type : config.WALLET_TYPE.PERSONNAL,
				owner : id,
				bitsoil : 0
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
}else{
	if( !TempWallets.findOne( {type : config.WALLET_TYPE.BOT} ) ){
		TempWallets.insert({
			createdAt : new Date(),
			type : config.WALLET_TYPE.BOT,
			bitsoil : 0
		});
	}
}