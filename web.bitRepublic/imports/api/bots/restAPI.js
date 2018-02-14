/*----------------------------------------*\
  bitRepublic - restAPI.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-16 00:23:43
  @Last Modified time: 2018-02-14 23:22:23
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Bots } from './bots.js';


if(Meteor.isServer){
	let Api = new Restivus({
		useDefaultAuth: true,
		prettyJson: true
	});

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
		* @apiHeader {String} bot._id
		* @apiHeader {String} Twitter-Auth-Token
		* @apiHeader {String} Twitter-User-Id
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