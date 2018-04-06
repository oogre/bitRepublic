/*----------------------------------------*\
  txtGen - command.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-04-06 19:20:28
  @Last Modified time: 2018-04-06 19:26:26
\*----------------------------------------*/
import { Wallets } from '../wallets/wallets.js';
import {config} from '../../startup/config.js';

if(Meteor.isServer){
	Meteor.methods({
		"bitsoil.consume.reset" : function(){
			Wallets.update({
				type : config.WALLET_TYPE.CONSUME
			}, {
				$set : {
					publicKeys : [],
					bitsoilToConsume : [],
					updatedAt : new Date()
				}
			});
		}
	});
}