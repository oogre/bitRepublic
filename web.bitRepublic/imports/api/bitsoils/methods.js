/*----------------------------------------*\
  bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 13:45:04
  @Last Modified time: 2018-04-06 19:20:56
\*----------------------------------------*/
import { Wallets } from '../wallets/wallets.js';
import { TempWallets } from '../wallets/wallets.js';
import {config} from '../../startup/config.js';
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';

export const BitsoilCreate = new ValidatedMethod({
	name: 'Bitsoils.methods.create',
	validate: new SimpleSchema({
		bitsoil: { 
			type: Number, 
			decimal : true, 
			min : config.BITSOIL_UNIT.MIN, 
			max : config.BITSOIL_UNIT.MAX 
		}
	}).validator({clean:true}),
	mixins: [RateLimiterMixin],
	rateLimit: config.METHODS.RATE_LIMIT.SUPERFAST,
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: true,
	},
	run({ bitsoil }) {
		bitsoil = parseFloat(bitsoil.toFixed(6));

		Wallets.update({
			type : config.WALLET_TYPE.PUBLIC, 
			owner : { 
				$exists : false 
			}
		},{
			$inc : {
				bitsoil : bitsoil
			},
			$set : {
				updatedAt : new Date()
			}
		});

		if (this.isSimulation) {
			TempWallets.update({
				type : config.WALLET_TYPE.BOT, 
				owner : { 
					$exists : false 
				}
			},{
				$inc : {
					bitsoil : bitsoil
				}
			});
		}

		return {
			success : true,
			message : "Bitsoil created"
		};
	}
});


