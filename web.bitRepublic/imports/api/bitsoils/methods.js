import { Meteor } from 'meteor/meteor';
import { BitSoils } from './bitsoils.js';


Meteor.methods({
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