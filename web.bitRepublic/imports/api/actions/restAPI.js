/*----------------------------------------*\
  bitRepublic - restAPI.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-16 00:23:43
  @Last Modified time: 2018-05-03 02:29:27
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
//import { Bots } from './bots.js';
import { Actions } from './actions.js';
import {Api} from '../restAPI.js';

if(Meteor.isServer){
	Api.addRoute('action/confirm/:actionId/:botName/:tweetId', {
		/**
		* @api {get} /api/action/confirm
		* @apiName ConfirmAction
		* @apiGroup Action
		*
		* @apiDescription Call this to confirm the action as been succesfully performed
		*
		* @apiHeader {String} X-Auth-Token auth_token
		* @apiHeader {String} X-User-Id user_id
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
				if("FAIL" == this.urlParams.tweetId){
					return {
						status : "error",
						message : "tweetId : \"FAIL\""
					}
				}
				return {
					status : "success",
					data : Actions.update({
							_id  : this.urlParams.actionId,
							$or : [
								{
									history : {
										$not : {
											$elemMatch : {
												tweetId : {
													$eq : this.urlParams.tweetId
												}
											}
										}
									}
								},{
									history : {
										$exists : false
									}
								}, {
									history : {
										$size : 0
									}
								}
							]
						}, {
							$inc : {
								counter : 1
							},
							$push : {
								history : {
									createdAt : new Date(),
									botName : this.urlParams.botName.replace("@", ""),
									tweetId : this.urlParams.tweetId
								}
							}
						})
				}
			}
		}
	});
}