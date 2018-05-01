/*----------------------------------------*\
  bitRepublic - config.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 14:16:42
  @Last Modified time: 2018-05-01 23:19:23
\*----------------------------------------*/
export const config = {
	VIDEO_GALLERY : {
		DEFAULT : "https://vimeo.com/261994272"
	},
	TARGET : {
		SPREADSHEET : "1FU74p-OzAEqeeg70nzW2HYjaYDkP0a8bSgdj6SE73kI"
	},
	ACTION : {
		INTERVAL : 60000
	},
	WALLET_TYPE : {
		PUBLIC : 0,
		CONSUME : 1,
		BOT : 2,
		PERSONNAL : 3
	},
	TWEETS : {
		LEN : {
			MIN : 1,
			MAX : 255
		}
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
		LIMIT : 12
	},
	METHODS : {
		RATE_LIMIT : {
			SLOW : {
				numRequests: 1,
				timeInterval: 60000,
			},
			FAST : {
				numRequests: 1,
				timeInterval: 5000,
			},
			SUPERFAST : {
				numRequests: 5,
				timeInterval: 5000,
			}
		}
	},
	FORM : {
		ERRORS : {
			name : {
				required : "your name is require"
			},
			subject : {
				required : "the subject is require"
			},
			message : {
				required : "the message is require"
			},
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
			target : {
				required : "your target is require"
			},
			password : {
				required : "your password is require",
				tooShort : "your password is too short.",
				tooLong : "your password is too long.",
			},
			"password-check" : {
				required : "your password is require",
				corrupted : "passwords has to match"
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
