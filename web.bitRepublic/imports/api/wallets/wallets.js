/*----------------------------------------*\
  bitRepublic - wallets.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 14:33:56
  @Last Modified time: 2018-02-14 18:08:58
\*----------------------------------------*/

import { Mongo } from 'meteor/mongo';

import './publications.js';
import './restAPI.js';
import './startup.js';

import {config} from '../../startup/config.js';

export const Wallets = new Mongo.Collection('wallets');
export const TempWallets = new Mongo.Collection(null);


if(Meteor.isServer){
	const personnalWalletReq = {
		type : config.WALLET_TYPE.PERSONNAL, 
		owner : { $exists:true}
	};

	Wallets.find({ type : config.WALLET_TYPE.PUBLIC, owner : { $exists:false } }).observe({
		changed(newWallet, oldWallet){
			let countBitsoil = newWallet.bitsoil - oldWallet.bitsoil;
			if(countBitsoil <= 0) return;
			countBitsoil = parseFloat(countBitsoil.toFixed(6));

			let wallet = Wallets.find(personnalWalletReq, {
				skip : Math.floor(Wallets.find(personnalWalletReq).count() * Math.random()),
				limit : 1
			},{
				fileds : {
					_id : true
				}
			}).fetch();
			if(_.isEmpty(wallet)) return;

			wallet = wallet[0];
			Wallets.update({
				_id : wallet._id
			}, {
				$inc : {
					bitsoil : countBitsoil
				},
				$set : {
					updatedAt : new Date()
				}
			});
			console.log(countBitsoil + " bitsoils redistributed to '" + wallet._id + "'");
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