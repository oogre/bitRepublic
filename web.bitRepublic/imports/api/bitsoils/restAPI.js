/*----------------------------------------*\
  bitRepublic - restAPI.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-25 14:46:45
  @Last Modified time: 2018-02-05 19:08:45
\*----------------------------------------*/
//import { Meteor } from 'meteor/meteor';
//import { BitSoils } from './bitsoils.js';
import {config} from '../../startup/config.js';
import { BitsoilCreate } from './methods.js';

import { Wallets } from '../wallets/wallets.js';
import * as Utilities from '../../utilities.js'

if(Meteor.isServer){
	let Api = new Restivus({
		useDefaultAuth: true,
		prettyJson: true
	});

	/**
	* @api {get} /api/bitsoil/count
	* @apiName CountBitsoil
	* @apiGroup Bitsoil
	*
	* @apiDescription Call this to know how the number of bitsoil 
	*
	* @apiSuccess {Number} Bitsoil quantity
	*/
	Api.addRoute('bitsoil/count', {authRequired: false}, {
		get: function () {
			let wallet = Wallets.findOne({
				type : config.WALLET_TYPE.PUBLIC, 
				owner : { 
					$exists : false 
				}
			}, {
				fields : {
					bitsoil : 1
				}
			});

			if(wallet){
				return {
					success : true,
					data : parseFloat(wallet.bitsoil.toFixed(6))
				};
			};
		}
	});

	/**
	* @api {post} /api/bitsoil/wallets
	* @apiName listWallets
	* @apiGroup Wallets
	*
	* @apiDescription Call this to create one bitsoil
	*
	* @apiParam {String} X-Auth-Token auth_token
	* @apiParam {String} X-User-Id user_id
	*
	* @apiSuccess {Number} Bitsoil quantity
	*/
	Api.addRoute('bitsoil/wallets', {authRequired: true}, {
		get: function () {
			return Wallets.find({
				type : config.WALLET_TYPE.PERSONNAL
			}, {
				fields : {
					bitsoil : 1,
					updatedAt : 1
				},
				sort : {
					bitsoil : -1
				}
			}).fetch().map((wallet)=>{
				wallet._id = wallet._id.toUpperCase();
				wallet.bitsoil = parseFloat(wallet.bitsoil.toFixed(6));
				return wallet;
			});
		}
	});

	/**
	* @api {post} /api/bitsoil/create
	* @apiName CreateBitsoil
	* @apiGroup Bitsoil
	*
	* @apiDescription Call this to create one bitsoil
	*
	* @apiParam {String} X-Auth-Token auth_token
	* @apiParam {String} X-User-Id user_id
	*
	* @apiSuccess {Number} Bitsoil quantity
	*/
	Api.addRoute('bitsoil/create', {authRequired: true}, {
		post: function () {
			let data = {
				bitsoil : config.BITSOIL_UNIT.MIN
			};

			BitsoilCreate.validate(data);
			BitsoilCreate.call(data);

			return {
				success : true,
				message : "Bitsoil created"
			};
		}
	});
}