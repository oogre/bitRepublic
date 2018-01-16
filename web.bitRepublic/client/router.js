import React from 'react';
import { render } from 'react-dom';
import App from '../imports/ui/App.js';

FlowRouter.route( '/', {
	name: 'home',
	action( params ) {
		///ReactLayout.render( App, { yield: <Pizza /> } );
		render(<App />, document.getElementById('render-target'));
	}
});