import { Mongo } from 'meteor/mongo';

import './publications.js';
import './restAPI.js';
import './methods.js';
import './startup.js';

import {config} from '../../startup/config.js';


export const Wallets = new Mongo.Collection('wallets');
export const TempWallets = new Mongo.Collection(null);


if(Meteor.isServer){
	const personnalWalletReq = {
		type : config.WALLET_TYPE.PERSONNAL, 
		owner : { $exists:true}
	};

	Meteor.users.find({}).observeChanges({
		added(id, user) {
			let walletId = Wallets.insert({
				createdAt : new Date(),
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

	Wallets.find({ type : config.WALLET_TYPE.PUBLIC, owner : { $exists:false } }).observe({
		changed(newWallet, oldWallet){
			let countBitsoil = newWallet.bitsoil - oldWallet.bitsoil;
			if(countBitsoil <= 0) return;
			countBitsoil = parseFloat(countBitsoil.toFixed(6));

			let wallet = Wallets.find(personnalWalletReq, {
				skip : Math.floor(Wallets.find(personnalWalletReq).count() * Math.random()),
				limit : 1
			}).fetch();
			if(_.isEmpty(wallet)) return;

			wallet = wallet[0];
			Wallets.update({
				_id : wallet._id
			}, {
				$inc : {
					bitsoil : countBitsoil
				}
			});
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