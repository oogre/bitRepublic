/*----------------------------------------*\
  bitRepublic - restAPI.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-16 00:23:43
  @Last Modified time: 2018-03-14 18:43:29
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
//import { Bots } from './bots.js';
import { Actions } from './actions.js';


if(Meteor.isServer){
	let Api = new Restivus({
		useDefaultAuth: true,
		prettyJson: true
	});

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
							$push : {
								history : {
									botName : this.urlParams.botName,
									tweetId : this.urlParams.tweetId
								}
							}
						})
				}
			}
		}
	});
}