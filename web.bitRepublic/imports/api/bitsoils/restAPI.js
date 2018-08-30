/*----------------------------------------*\
  bitRepublic - restAPI.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-25 14:46:45
  @Last Modified time: 2018-08-30 13:54:19
\*----------------------------------------*/


import {config} from '../../startup/config.js';
import { Wallets } from '../wallets/wallets.js';
import moment from 'moment';
import {Api} from '../restAPI.js';

if(Meteor.isServer){	
	Api.addRoute('redistribution', {
		get: {
			authRequired: false,
			//roleRequired: ['user'],
			action : function () {
				
				let publicWallet = Wallets.findOne({
					type : config.WALLET_TYPE.PUBLIC, 
					owner : { 
						$exists : false 
					}
				}, {
					fields : {
						bitsoil : 1
					}
				});

				let personnalWallets = Wallets.find({
					type : config.WALLET_TYPE.PERSONNAL, 
					owner : {
						$exists:true
					}
				}, {
					fields : {
						_id : 1,
						createdAt : 1,
						bitsoil : 1
					}
				}).fetch();
				let totalTemp = personnalWallets.reduce((acc, w) => acc += moment.duration(moment().diff(moment(w.createdAt))).as('seconds'), 0);

				for(w of personnalWallets){
					Wallets.update({
						_id : w._id
					}, {
						$set : {
							bitsoil : (moment.duration(moment().diff(moment(w.createdAt))).as('seconds') / totalTemp) * publicWallet.bitsoil,
						}
					});
				}
				
				let sumPersonnal = personnalWallets.reduce((acc, w) => acc += w.bitsoil, 0);
				return {
					publicWallet : publicWallet,
					personnalWallets : personnalWallets,
					sumPersonnal : sumPersonnal
				};
			}
		}
	});
	Api.addRoute('sumWallets', {
		get: {
			authRequired: false,
			//roleRequired: ['user'],
			action : function () {
				
				let publicWallet = Wallets.findOne({
					type : config.WALLET_TYPE.PUBLIC, 
					owner : { 
						$exists : false 
					}
				}, {
					fields : {
						bitsoil : 1
					}
				});

				let personnalWallets = Wallets.find({
					type : config.WALLET_TYPE.PERSONNAL, 
					owner : {
						$exists:true
					}
				}, {
					fields : {
						_id : 1,
						createdAt : 1,
						bitsoil : 1
					}
				}).fetch();
				
				let sumPersonnal = personnalWallets.reduce((acc, w) => acc += w.bitsoil, 0);
				return {
					publicWallet : publicWallet,
					sumPersonnal : sumPersonnal
				};
			}
		}
	});

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

	Api.addRoute('bitsoil/consume/:type', {
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
/*
		"toConsume.byPrinter.publicKeys" : wallet.publicKey,
		"toConsume.byPrinter.bitsoil" : countBitsoil,
		"toConsume.bySpeaker.publicKeys" : wallet.publicKey,
		"toConsume.bySpeaker.bitsoil" : countBitsoil
*/
		get: {
			authRequired: true,
			action : function () {
				let type = this.urlParams.type;
				if(type != "printer" && type != "speaker" && type != "fan"){
					return {
						"status": "fail",
						message : "unknow type parameter"
					}
				}

				switch(type){
					case "printer" :
						type = "byPrinter";
					break;
					case "speaker" : 
						type = "bySpeaker";
					break;
					case "fan" : 
						type = "byFan";
					break;
					default :
					break;
				}
				

				let fieldsRequest = {
					fields : {}
				}
				fieldsRequest.fields["toConsume_"+type+"_publicKeys"]=1;
				fieldsRequest.fields["toConsume_"+type+"_bitsoils"]=1;

				let wallet = Wallets.findOne({
					type : config.WALLET_TYPE.CONSUME,
				}, fieldsRequest);
				

				if(	wallet["toConsume_"+type+"_publicKeys"].length > 0 
				&& 	wallet["toConsume_"+type+"_bitsoils"].length > 0 
				){
					let bitsoil = wallet["toConsume_"+type+"_bitsoils"].pop();
					let publicKey = wallet["toConsume_"+type+"_publicKeys"].pop();

					let request = {};
					request["toConsume_"+type+"_publicKeys"] = -1;
					request["toConsume_"+type+"_bitsoils"] = -1;

					Wallets.update({
						type : config.WALLET_TYPE.CONSUME,
					}, {
						$pop : request,
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