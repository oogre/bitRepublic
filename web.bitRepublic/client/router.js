import React from 'react';
import { render } from 'react-dom';

import * as Utilities from '../imports/utilities.js'

import Redistribution from '../imports/ui/Redistribution.js';
import Installation from '../imports/ui/Installation.js';
import UserProfile from '../imports/ui/user/profile.js';
import UserUpdate from '../imports/ui/user/update.js';
import About from '../imports/ui/About.js';
import App from '../imports/ui/App.js';

FlowRouter.route( '/', {
	name: 'home',
	action( params ) {
		render(<App />, document.getElementById('render-target'));
		Utilities.scrollTo(FlowRouter.current().context.hash);
	},
	subscriptions: function(params, queryParams) {
		this.register('public.bots', Meteor.subscribe('public.bots'));
		this.register('schedules', Meteor.subscribe('schedules'));
		this.register('public.wallet', Meteor.subscribe('public.wallet'));
	}
});

FlowRouter.route('/about', {
	name: 'about',
	action( params ) {
		render(<About />, document.getElementById('render-target'));
		Utilities.scrollTo(FlowRouter.current().context.hash);
	}
});

FlowRouter.route('/redistribution', {
	name: 'redistribution',
	action( params ) {
		render(<Redistribution />, document.getElementById('render-target'));
		Utilities.scrollTo(FlowRouter.current().context.hash);
	},
	subscriptions: function(params, queryParams) {
		this.register('public.wallet', Meteor.subscribe('public.wallet'));
		this.register('all.wallet', Meteor.subscribe('all.wallet'));
	}
});

FlowRouter.route('/installation', {
	name: 'installation',
	action( params ) {
		render(<Installation />, document.getElementById('render-target'));
		Utilities.scrollTo(FlowRouter.current().context.hash);
	},
	subscriptions: function(params, queryParams) {
	}
});


let loginRoutes = FlowRouter.group({
	triggersEnter: [(context, redirect)=>{
		if(!Meteor.userId()){
			redirect("/");
		}
	}]
});

loginRoutes.route("/user/:username", {
	name: "userProfile",
	action: function(params) {
		render(<UserProfile />, document.getElementById('render-target'));
		Utilities.scrollTo(FlowRouter.current().context.hash);
	},
	subscriptions: function(params, queryParams) {
		this.register('my.wallet', Meteor.subscribe('my.wallet'));
		this.register('my.bots', Meteor.subscribe('my.bots'));
		this.register('my.files.images', Meteor.subscribe('my.files.images'));
	}
});

loginRoutes.route("/user/:username/update", {
	name: "userUpdate",
	action: function(params) {
		render(<UserUpdate />, document.getElementById('render-target'));
		Utilities.scrollTo(FlowRouter.current().context.hash);
	},
	subscriptions: function(params, queryParams) {
		this.register('my.files.images', Meteor.subscribe('my.files.images'));
	}
});