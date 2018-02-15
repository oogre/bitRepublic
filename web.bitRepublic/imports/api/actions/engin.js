/*----------------------------------------*\
  bitRepublic - engin.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-15 11:41:25
  @Last Modified time: 2018-02-15 12:13:00
\*----------------------------------------*/

import { Actions } from '../actions/actions.js';
import * as Utilities from '../../utilities.js'
import { BitsoilCreate } from '../bitsoils/methods.js';
import { config } from '../../startup/config.js';

if(Meteor.isServer){
	Meteor.setInterval(function(){
		console.log("Activation");
		Actions.find({
			nextActivation :{
				$lt : new Date()
			},
			active: true,
		}).fetch().map(function(action){
			console.warn("imports/api/actions/engin.js : "+"Action executed : Do not forget to call custom Twiter API for '" + action._id + "'");
			
			Actions.update(action._id, {
				$set : {
					nextActivation : Utilities.nowPlusSeconds(action.interval)
				}
			});
			BitsoilCreate.call({bitsoil : action.bitsoil});
		});
	}, config.ACTION.INTERVAL);
}