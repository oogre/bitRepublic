/*----------------------------------------*\
  bitRepublic - restAPI.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-25 14:46:45
  @Last Modified time: 2018-04-05 11:56:15
\*----------------------------------------*/


import {config} from '../../startup/config.js';
import { Wallets } from '../wallets/wallets.js';
import moment from 'moment';
import {Api} from '../restAPI.js';

if(Meteor.isServer){	
	Api.addRoute('bitsoil', {
		/**
		* @api {get} /api/bitsoil
		* @apiName CountBitsoil
		* @apiGroup Bitsoil
		*
		* @apiDescription Call this to know how the number of bitsoil 
		*
		* @apiSuccess {String} status : success
		* @apiSuccess {Number} Bitsoil quantity
		*
		* @apiSuccessExample Success-Response:
		*     HTTP/1.1 200 OK
		*     {
		*       "status": "success",
		*       "data": 0.000123
		*     }
		*/
		get: {
			authRequired: false,
			//roleRequired: ['user'],
			action : function () {
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
				return {
					"status": "success",
					data : (wallet ? parseFloat(wallet.bitsoil) : 0).toFixed(6)
				};
			}
		},

		/**
		* @api {post} /api/bitsoil
		* @apiName CreateBitsoil
		* @apiGroup Bitsoil
		* @apiPrivate
		*
		* @apiDescription Call this to create one bitsoil
		*
		* @apiHeader {String} X-Auth-Token auth_token
		* @apiHeader {String} X-User-Id user_id
		*
		* @apiSuccess {String} status : success
		* @apiSuccess {String} "Bitsoil created"
		*
		* @apiSuccessExample Success-Response:
		*     HTTP/1.1 200 OK
		*     {
		*       "status": "success",
		*       "data": "Bitsoil created"
		*     }
		*/
		post : {
			authRequired: true,
			//roleRequired: ['user'],
			action : function () {
				Wallets.update({
					type : config.WALLET_TYPE.PUBLIC, 
					owner : { 
						$exists : false 
					}
				},{
					$inc : {
						bitsoil : config.BITSOIL_UNIT.MIN
					},
					$set : {
						updatedAt : new Date()
					}
				});

				return {
					"status": "success",
					data : "Bitsoil created"
				};
			}
		}
	});

	Api.addRoute('bitsoil/consume', {
		/**
		* @api {post} /api/bitsoil/consume
		* @apiName ConsumeBitsoil
		* @apiGroup Bitsoil
		* @apiPrivate
		*
		* @apiDescription Call this to know if a bitsoil has been created 
		*
		* @apiHeader {String} X-Auth-Token auth_token
		* @apiHeader {String} X-User-Id user_id
		*
		* @apiSuccess {String} status : success
		* @apiSuccess {Boolean} true if a bitsoil has been created
		*
		* @apiSuccessExample Success-Response:
		*     HTTP/1.1 200 OK
		*     {
		*       "status": "success",
		*       "data": true
		*     }
		*/
		get: {
			authRequired: true,
			action : function () {
				let toConsume = Wallets.findOne({
					type : config.WALLET_TYPE.CONSUME,
				}, {
					fields : {
						bitsoilToConsume : 1,
						publicKeys : 1
					}
				});
				if(toConsume.bitsoilToConsume.length > 0 && toConsume.publicKeys.length > 0 ){
					let bitsoil = toConsume.bitsoilToConsume.pop();
					let publicKey = toConsume.publicKeys.pop();
					Wallets.update({
						type : config.WALLET_TYPE.CONSUME,
					}, {
						$pop : {
							bitsoilToConsume : -1,
							publicKeys : -1
						},
						$set : {
							updatedAt : new Date()
						}
					});
					return {
						"status": "success",
						data : {
							bitsoil : bitsoil,
							publicKey : publicKey,
							date : moment().format('DD-MM-YYYY HH:mm:ss')
						}
					}	
				}
				return {
					"status": "success",
					data : false
				}
			}
		}
	});
}