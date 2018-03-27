/*----------------------------------------*\
  bitRepublic - option.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 18:06:20
  @Last Modified time: 2018-02-02 00:09:15
\*----------------------------------------*/
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
			<li className="card">
				<header className="card__header">
					<h5 className="card__title">{this.props.bot.title[0]}</h5>
					<h6 className="card__subtitle">{this.props.bot.title[1]}</h6>
				</header>
				<div className="card__content">
					<img className="card__picture" src={this.props.bot.picture} alt=""/>
					<div className="card__counter">
						<BitsoilCounter unBlock="." bitsoil={this.props.bitsoil} tax={true}/>
					</div>
					{this.props.bot.description}
				</div>
				<footer className="card__footer">
					<button  className="button--ternary" onClick={this.botSelected.bind(this)} >Choose a Tweet</button>
				</footer>
			</li>
		);
	}
}
