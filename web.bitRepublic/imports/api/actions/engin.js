/*----------------------------------------*\
  bitRepublic - engin.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-15 11:41:25
  @Last Modified time: 2018-03-14 16:27:42
\*----------------------------------------*/

import { Actions } from '../actions/actions.js';
import { BitsoilCreate } from '../bitsoils/methods.js';
import * as Utilities from '../../utilities.js';
import { config } from '../../startup/config.js';


if(Meteor.isServer){
	Meteor.setInterval(function(){
		Utilities.log("Activation");
		let date = new Date();
		Actions.find({
			nextActivation :{
				$lte : date
			},
			active: true,
		},{
			fields : {
				interval : true,
				bitsoil  :true
			}
		}).fetch().map(function(action){
			Utilities.warn("imports/api/actions/engin.js : "+"Action executed : Do not forget to call custom Twiter API for " + action._id);
			
			Actions.update(action._id, {
				$set : {
					nextActivation : new Date(date.getTime() + (action.interval - 5)*1000)
				}
			});
			BitsoilCreate.call({bitsoil : action.bitsoil});
		});
	}, config.ACTION.INTERVAL);
}