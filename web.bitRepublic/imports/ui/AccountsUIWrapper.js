/*----------------------------------------*\
  bitRepublic - AccountsUIWrapper.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-25 16:25:48
  @Last Modified time: 2018-02-02 00:08:32
\*----------------------------------------*/
import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component{
	componentDidMount(){
		// User Meteor Blaze to render login Buttons
		this.view = Blaze.render(
			Template.loginButtons,
			ReactDOM.findDOMNode(this.refs.container)
		);
	}
	componentWillUnmount(){
		// clean up Blaze view
		Blaze.remove(this.view);
	}
	render(){
		// Just render placeholder container that will be filled in
		return <span ref="container" />;
	}

}