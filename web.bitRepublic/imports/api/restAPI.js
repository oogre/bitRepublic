import { Meteor } from 'meteor/meteor';

if(Meteor.isServer){
	let Api = new Restivus({
		useDefaultAuth: true,
		prettyJson: true
	});
	/**
	* @api {post} /api/login/
	* @apiName Login
	* @apiGroup Registration
	*
	* @apiParam {String} username username
	* @apiParam {String} password sha-256-password
	* @apiParam {Boolean} hashed true
	*
	* @apiSuccess {String} status "success"
	* @apiSuccess {Object} data
	* @apiSuccess {String} data.authToken 
	* @apiSuccess {String} data.userId
	*/

	/**
	* @api {post} /api/logout/
	* @apiName Logout
	* @apiGroup Registration
	*
	* @apiParam {String} X-Auth-Token auth_token
	* @apiParam {String} X-User-Id user_id
	*/
}