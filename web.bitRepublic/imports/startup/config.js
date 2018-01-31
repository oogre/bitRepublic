export const config = {
	WALLET_TYPE : {
		PUBLIC : 0,
		PERSONNAL : 1,
		BOT : 2
	},
	TAX_RATE : 0.0427,
	BOT_INFO_TOTAL_INTERVAL: 60 * 60 * 24,
	PWD_LENGTH : {
		MIN : 6,
		MAX : 64
	},
	BITSOIL_UNIT : {
		MIN : 0.000001,
		MAX : 1.0
	},
	WALLET_LIST : {
		LIMIT : 10
	},
	FORM : {
		ERRORS : {
			firstname : {
				required : "your firstname is require"
			},
			lastname : {
				required : "your lastname is require"
			},
			email : {
				required : "your email is require",
				'already-exists' : "your email is already recorded",
			},
			username : {
				required : "your username is require",
				'already-exists' : "your username is already recorded",
			},
			country : {
				required : "your country is require"
			},
			password : {
				required : "your password is require"
			},
			login : {
				'needed' : "you have to be logged in to perform this action"
			},
			avatar : {
				'needed' : "the picture does not exist"
			},
			action : {
				'needed' : "the action does not exist"
			},
			'bot-model' : {
				'needed' : "the bot model does not exist",
				'corrupted' : "the bot model is corrupted"
			},
			"tweet" : {
				minCount : "select at leat one tweet",
				content : {
					required : "the tweet must be filled",
					maxString : "the tweet is too long",
				},
				schedules : {
					"minCount" : "select at least 2 schedules"
				},
			},
			admin : {
				'needed' : "you have to be admin to perform this action"
			}
		}
	}
}
