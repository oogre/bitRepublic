import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';


class BotOption extends Component {
	constructor(props){
		super(props);
	}
	botSelected(event){
		event.preventDefault();
		this.props.onSelected(this.props.bot);
	}
	
	render() {
			return (
			<li key={this.props.bot.target}>
				<div>
					<div>{this.props.bot.title[0]}</div>
					{this.props.bot.title[1]}
				</div>
				<div>
				</div>
				<div>
					{this.props.bot.description}
				</div>
				<button onClick={this.botSelected.bind(this)} >Choose a Tweet</button>
			</li>
		);
  	}
}

export default withTracker(() => {

	return {
		
	};

})(BotOption);