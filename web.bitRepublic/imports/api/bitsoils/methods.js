import { Meteor } from 'meteor/meteor';
import { Wallets } from '../wallets/wallets.js';
import { TempWallets } from '../wallets/wallets.js';

import { check } from 'meteor/check';
import {config} from '../../startup/config.js';

Meteor.methods({
	/**
		* @api {Meteor.call} /api/bitsoils/create
		* @apiName bitsoils.create
		* @apiGroup Private
		*
		* @apiDescription Call Meteor.call('bitsoils.create' ... to create bitsoil
		* the user has to be loged in
		*
		* @apiSuccess {String} BitSoils._id the _id of the newly created bitsoil
		*/
	'bitsoils.generate' : function(data){
		check(data, Number);
		Wallets.update({
			type : config.WALLET_TYPE.PUBLIC, 
			owner : { 
				$exists:false 
			}
		},{
			$inc : {
				bitsoil : data
			}
		});
		
		TempWallets.update({
			type : config.WALLET_TYPE.BOT, 
			owner : { 
				$exists:false 
			}
		},{
			$inc : {
				bitsoil : data
			}
		});
	}
});