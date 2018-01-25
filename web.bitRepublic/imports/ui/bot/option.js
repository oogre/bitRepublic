import React, { Component } from 'react';

import BitsoilCounter from '../bitsoil/counter.js';

export default class BotOption extends Component {
	constructor(props){
		super(props);
	}
	botSelected(event){
		event.preventDefault();
		this.props.onSelected(this.props.bot);
	}
	
	render() {
			return (
			<div className="container">
				<div>
					<div>{this.props.bot.title[0]}</div>
					{this.props.bot.title[1]}
				</div>
				<div>
					<BitsoilCounter bitsoil={this.props.wallet.bitsoil}/>
				</div>
				<div>
					{this.props.bot.description}
				</div>
				<button onClick={this.botSelected.bind(this)} >Choose a Tweet</button>
			</div>
		);
  	}
}