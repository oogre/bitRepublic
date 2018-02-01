/*----------------------------------------*\
  bitRepublic - methods.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 23:18:05
  @Last Modified time: 2018-02-02 00:06:39
\*----------------------------------------*/
import cp from 'child_process'
import { exec } from 'child_process'
import { RateLimiterMixin } from 'ddp-rate-limiter-mixin';

export const GetContentGallery = new ValidatedMethod({
	name: 'gallery.content.get',
	validate: new SimpleSchema({
	}).validator({clean:true}),
	mixins: [RateLimiterMixin],
	rateLimit: {
		numRequests: 5,
		timeInterval: 5000,
	},
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: false,
	},
	run({ }) {
		if (!this.isSimulation) {
			let runCmd = Meteor.wrapAsync((callback)=>{
				exec("cd "+process.env.PWD+"/public ;" + "find images/gallery -type f -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg'", (err, stdout, stderr) => {
					if (err) {
						return callback(err);
					}
					callback(null, _.compact(stdout.split("\n")));
				});
			});
			return {
				success : true,
				message : "TEST",
				data : runCmd()
			};
		}
	}
});

export const GetContentSlider = new ValidatedMethod({
	name: 'slider.content.get',
	validate: new SimpleSchema({
	}).validator({clean:true}),
	// This is optional, but you can use this to pass options into Meteor.apply every
	// time this method is called.  This can be used, for instance, to ask meteor not
	// to retry this method if it fails.
	applyOptions: {
		noRetry: false,
	},
	run({ }) {
		if (!this.isSimulation) {
			let runCmd = Meteor.wrapAsync((callback)=>{
				exec("cd "+process.env.PWD+"/public ;" + "find images/slider -type f -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg'", (err, stdout, stderr) => {
					if (err) {
						return callback(err);
					}
					callback(null, _.compact(stdout.split("\n")));
				});
			});
			return {
				success : true,
				message : "TEST",
				data : runCmd()
			};
		}
	}
});