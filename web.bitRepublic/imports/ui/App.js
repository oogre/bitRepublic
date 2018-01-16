import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import BitSoilsCounter from './bitsoil/counter.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
class App extends Component {
	constructor(props){
		super(props);
	}
	
	renderTasks() {
		
	}
	
	render() {
	    return (
			<div className="container">
				<header>
					<h1>BitRepublic</h1>
				</header>
				<BitSoilsCounter />
				<AccountsUIWrapper />

			</div>
		);
  	}
}

export default withTracker(() => {
	//Meteor.subscribe('tasks');
	return {
	/*	tasks: Tasks.find({}, {
			sort : {
				createdAt : -1
			}
		}).fetch(),
		incompleteCount : Tasks.find({
			checked : {
				$ne:true
			}
		}).count(),
		currentUser : Meteor.user()*/
	};
})(App);