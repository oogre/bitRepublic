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
			country : {
				required : "your country is require"
			},
			password : {
				required : "your password is require"
			},
		}
	}
}
