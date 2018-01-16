import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

// App component - represents the whole app
class SliderMenu extends Component {
	constructor(props){
		super(props);
	}
	
	render() {
	    return (
			<div className="container">
				<ul>
					<li>
						<a href="#">Design your taxbot</a>
					</li>
					<li>
						<a href="#">Foind out more</a>
					</li>
				</ul>
			</div>
		);
  	}
}

export default withTracker(() => {
	
	return {
		userId : Meteor.userId(),
		currentUser : Meteor.user()
	};
})(SliderMenu);