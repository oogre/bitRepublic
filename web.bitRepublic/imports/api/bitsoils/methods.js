import { Meteor } from 'meteor/meteor';
import { BitSoils } from './bitsoils.js';


Meteor.methods({
	/**
		* @api {Meteor.call} /api/bitsoils/create
		* @apiName bitsoils.create
		* @apiGroup Private
		*
		* @apiDescription Call Meteor.call('bitsoils.create' ... to create bitsoil
		* the user has to be loged in
		*
		* @apiSuccess {String} BitSoils._id the _id of the newly created bitsoil
		*/
	'bitsoils.create' : function(){
		if(! this.userId){
			throw new Meteor.Error('not-authorized');
		}
		let userId = this.userId;
		return BitSoils.insert({
			createdAt : new Date(),
			creatorId : userId
		});
	}
})