import { Meteor } from 'meteor/meteor';
import { BitSoils } from './bitsoils.js';


if(Meteor.isServer){
	Meteor.publish('bitsoils', function bitsoilsPublication(){
		return BitSoils.find();
	});
}