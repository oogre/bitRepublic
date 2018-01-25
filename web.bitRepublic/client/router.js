import React from 'react';
import { render } from 'react-dom';
import App from '../imports/ui/App.js';
import About from '../imports/ui/About.js';
import Redistribution from '../imports/ui/Redistribution.js';
import Installation from '../imports/ui/Installation.js';

FlowRouter.route( '/', {
	name: 'home',
	action( params ) {
		render(<App />, document.getElementById('render-target'));
	},
	subscriptions: function(params, queryParams) {
		this.register('bitsoils', Meteor.subscribe('bitsoils'));
		this.register('bots', Meteor.subscribe('bots'));
		this.register('schedules', Meteor.subscribe('schedules'));
	}
});

FlowRouter.route('/about', {
	name: 'about',
	action( params ) {
		render(<About />, document.getElementById('render-target'));
	},
	subscriptions: function(params, queryParams) {
		//this.register('bitsoils', Meteor.subscribe('bitsoils'));
	}
});

FlowRouter.route('/redistribution', {
	name: 'redistribution',
	action( params ) {
		render(<Redistribution />, document.getElementById('render-target'));
	},
	subscriptions: function(params, queryParams) {
		//this.register('bitsoils', Meteor.subscribe('bitsoils'));
	}
});

FlowRouter.route('/installation', {
	name: 'installation',
	action( params ) {
		render(<Installation />, document.getElementById('render-target'));
	},
	subscriptions: function(params, queryParams) {
		//this.register('bitsoils', Meteor.subscribe('bitsoils'));
	}
});