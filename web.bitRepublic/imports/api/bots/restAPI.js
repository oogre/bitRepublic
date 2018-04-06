/*----------------------------------------*\
  bitRepublic - restAPI.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-16 00:23:43
  @Last Modified time: 2018-04-05 11:56:40
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Bots } from './bots.js';
import {Api} from '../restAPI.js';

if(Meteor.isServer){
	
	Api.addRoute('bot/confirm', {
		/**
		* @api {get} /api/bot/confirm
		* @apiName ConfirmBot
		* @apiGroup Bot
		*
		* @apiDescription Call this to confirm tweeter bot creation
		*
		* @apiHeader {String} X-Auth-Token auth_token
		* @apiHeader {String} X-User-Id user_id
		* @apiHeader {String} tweet._id
		* @apiHeader {String} action._id
		*
		* @apiSuccess {String} status : success
		*
		* @apiSuccessExample Success-Response:
		*     HTTP/1.1 200 OK
		*     {
		*       "status": "success"
		*     }
		*/
		post : {
			authRequired: true,
			//roleRequired: ['user'],
			action : function () {
				return {
					"status": "success"
				};
			}
		}
	});
}