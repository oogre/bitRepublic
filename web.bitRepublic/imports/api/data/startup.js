/*----------------------------------------*\
  larbitsSisters - startup.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-04-11 18:56:46
  @Last Modified time: 2018-04-11 19:01:02
\*----------------------------------------*/
import {Data} from './data.js';
import { config } from '../../startup/config.js';

Meteor.startup(() => {
	if(Meteor.isServer){
		if(!Data.findOne({
			type : "video.gallery"
		})){
			Data.insert({
				type : "video.gallery",
				default : config.VIDEO_GALLERY.DEFAULT,
				value : config.VIDEO_GALLERY.DEFAULT
			});
		}
	}
})