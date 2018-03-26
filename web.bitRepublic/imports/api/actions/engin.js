/*----------------------------------------*\
  bitRepublic - engin.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-15 11:41:25
  @Last Modified time: 2018-03-26 15:30:04
\*----------------------------------------*/

import { Actions } from '../actions/actions.js';
import { Bots } from '../bots/bots.js';
import { BitsoilCreate } from '../bitsoils/methods.js';
import * as Utilities from '../../utilities.js';
import { config } from '../../startup/config.js';


if(Meteor.isServer){

	let nextBotNetConnection = null;
	let botNetToken = null;
	function getToken(){
		if(botNetToken == null || nextBotNetConnection == null || nextBotNetConnection <= (new Date()).getTime() ){
			const result = HTTP.call('POST', process.env.TWEETER_BOT_URI+'/api/token', {
				auth: process.env.TWEETER_BOT_USER+":"+process.env.TWEETER_BOT_PWD,
				headers : {
					"Content-Type" : "application/json"
				}
			});
			if(result.statusCode != 200) {
				console.error( "BOT NET CONNECTION FAILED", result);
				return botNetToken;
			}
			if(!result.data || !result.data.duration || !result.data.token) {
				console.error( "BOT NET CONNECTION MISS SOME DATA", result);
				return botNetToken;
			}
			nextBotNetConnection = Utilities.nowPlusSeconds(result.data.duration)
			botNetToken = result.data.token;
			console.log("NEXT BOTNET CONNECTION", nextBotNetConnection);
		}
		return botNetToken;
	}

	Meteor.setInterval(function(){
		Utilities.log("Tweet engin is up to run");
		let date = new Date();
		Actions.find({
			nextActivation :{
				$lte : date
			},
			active: true,
		},{
			fields : {
				_id : true,
				interval : true,
				bitsoil  :true,
				content : true,
				bot : true
			}
		}).fetch().map(function(action){
			action.bot = Bots.findOne({_id:action.bot});
			if(action.bot){
				HTTP.call('POST', process.env.TWEETER_BOT_URI+'/api/submit_task', {
					auth: process.env.TWEETER_BOT_USER+":"+process.env.TWEETER_BOT_PWD,
					headers : {
						"Content-Type" : "application/json",
						"X-Auth-Token" : getToken()
					},
					data: { 
						task_id: action._id,
						user_id: action.bot.owner,
						tweet_text: action.content,
						tweet_target:"ogre_vince",
						tweet_pic_id:"bot0"
					}
					console.war("/action/engin", "DO NOT FORGET TO CHANGE THE tweet_target");
					console.war("/action/engin", "DO NOT FORGET TO CHANGE THE tweet_pic_id");
				}, function(err, res){
					console.warn("Tweet engin has runned for", action._id);
					if (err){
						console.error( "BOT NET POST TWEET ERROR", err);
					}else{
						console.log(res.data);		
					}
					Actions.update(action._id, {
						$set : {
							nextActivation : Utilities.nowPlusSeconds(action.interval - 5)
						}
					});
					BitsoilCreate.call({bitsoil : action.bitsoil});
				});
			}else{
				console.warn("THIS ACTION", action._id, "HAS NO MORE BOT. IT WILL BE DISACTIVATED");
				Actions.update(action._id, {
					$set : {
						active : false
					}
				});
			}
		});
	}, config.ACTION.INTERVAL);
}