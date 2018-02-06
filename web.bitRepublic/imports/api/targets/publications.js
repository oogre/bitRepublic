/*----------------------------------------*\
  bitRepublic - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-16 00:25:20
  @Last Modified time: 2018-02-06 13:45:41
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Targets } from './targets.js';


if(Meteor.isServer){
	Meteor.publish('targets', function targetsPublication(){
		return Targets.find({});
	});
}