/*----------------------------------------*\
  bitRepublic - restAPI.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-02 00:02:44
  @Last Modified time: 2018-04-05 11:56:50
\*----------------------------------------*/

import { Wallets } from './wallets.js';
import * as Utilities from '../../utilities.js'
import {config} from '../../startup/config.js';
import {Api} from '../restAPI.js';

if(Meteor.isServer){
	Api.addRoute('wallets', {
		/**
		* @api {post} /api/wallet
		* @apiName listWallet
		* @apiGroup Wallet
		* @apiPrivate
		*
		* @apiDescription Call this to have the list of all wallets
		*
		* @apiHeader {String} X-Auth-Token auth_token
		* @apiHeader {String} X-User-Id user_id
		*
		* @apiSuccess {String} status : success
		* @apiSuccess {Object[]]} Array of 10 richest wallets
		*
		* @apiSuccessExample Success-Response:
		*     HTTP/1.1 200 OK
		*     {
		*       "status": "success",
		*       "data": [{
		*			bitsoil: 0.000009,
		*           key : "2LjFKYJ5CayMaEyD3Xi6w3CPmo3NWRgf",
		*           number : "000023"
		*       }]
		*     }
		*/
		get: {
			authRequired: true,
			//roleRequired: ['user'],
			action : function () {
				console.log(this.urlParams);

				return {
					"status": "success",
					data : Wallets.find({
						type : config.WALLET_TYPE.PERSONNAL
					}, {
						fields : {
							_id : 0,
							bitsoil : 1,
							key : 1,
							number : 1
						},
						sort : {
							bitsoil : -1
						},
						limit : 10
					}).fetch().map((wallet)=>{
						wallet._id = wallet._id;
						wallet.bitsoil = parseFloat(wallet.bitsoil.toFixed(6));
						wallet.number = Utilities.numberFormat(wallet.number, 7);
						return wallet;
					})
				}
			}
		}
	});
}