/*----------------------------------------*\
  bitRepublic - restAPI.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-25 14:46:45
  @Last Modified time: 2018-02-02 00:07:04
\*----------------------------------------*/
//import { Meteor } from 'meteor/meteor';
//import { BitSoils } from './bitsoils.js';


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
	/*
	Api.addRoute('bitsoil/count', {authRequired: false}, {
		get: function () {
			return BitSoils.find().count();
		}
	});*/

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
	/*
	Api.addRoute('bitsoil/create', {authRequired: true}, {
		post: function () {
			let userId = this.userId;
			return BitSoils.insert({
				createdAt : new Date(),
				creatorId : userId
			});
		}
	});
	*/
}