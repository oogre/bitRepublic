import { Meteor } from 'meteor/meteor';
import { Wallets } from './wallets.js';

Meteor.methods({
	/**
	* @api {Meteor.call} /api/wallets/create
	* @apiName wallets.create
	* @apiGroup Private
	*
	* @apiDescription Call Meteor.call('wallets.create' ... to create wallet
	* the user has to be loged in
	*
	* @apiSuccess {String} Wallets._id the _id of the newly created bitsoil
	*/
	'wallets.create' : function(){
		if(! Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}
		return Wallets.insert({
			createdAt : new Date(),
			creatorId : Meteor.userId()
		});
	}
});