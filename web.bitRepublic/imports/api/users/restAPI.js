/*----------------------------------------*\
  bitRepublic - restAPI.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-02 00:02:44
  @Last Modified time: 2018-02-05 18:19:04
\*----------------------------------------*/


if(Meteor.isServer){
	let Api = new Restivus({
		useDefaultAuth: true,
		prettyJson: true
	});
}