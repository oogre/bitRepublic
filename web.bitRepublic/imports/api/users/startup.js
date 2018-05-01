/*----------------------------------------*\
  bitRepublic - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 18:21:50
  @Last Modified time: 2018-05-01 17:15:05
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	if(Meteor.isServer){
		if(!Meteor.users.findOne({username : "admin"})){
			if(!process.env.ADMIN_MAIL || !process.env.ADMIN_PWD){
				console.log("TO CREATE ADMIN USER SETUP 'ADMIN_MAIL' AND 'ADMIN_PWD' AS process.env");
			} else {
				console.log("INSERT ADMIN");
				let adminUserData = {
					username : "admin",
					profile : {
						firstname : "admin",
						lastname : "admin"
					},
					email : process.env.ADMIN_MAIL,
					password : process.env.ADMIN_PWD
				}
				console.log("admin info : ");
				console.log("\tusername:"+adminUserData.username);
				console.log("\temail:"+adminUserData.email);
				console.log("\tpassword:"+adminUserData.password);
				let adminId =  Accounts.createUser(adminUserData);
				Roles.addUsersToRoles(adminId, ['admin'])

				console.log("INSERT RPI");
				let rpiUserData = {
					username : process.env.RPI_USR,
					profile : {
						firstname : "default",
						lastname : "default"
					},
					email : process.env.RPI_MAIL,
					password : process.env.RPI_PWD
				}
				console.log("rpi info : ");
				console.log("\tusername:"+rpiUserData.username);
				console.log("\temail:"+rpiUserData.email);
				console.log("\tpassword:"+rpiUserData.password);
				let rpiId =  Accounts.createUser(rpiUserData);
				Roles.addUsersToRoles(rpiId, ['user'])
			}
		}
	}
});