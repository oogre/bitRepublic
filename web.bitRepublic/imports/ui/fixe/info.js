/*----------------------------------------*\
  bitRepublic - info.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 22:11:26
  @Last Modified time: 2018-05-03 01:21:06
\*----------------------------------------*/
import React, { Component } from 'react';

import Utilities from '../../utilities';
import T from './../../i18n/index.js';
// App component - represents the whole app
export default class FixeInfo extends Component {
	constructor(props){
		super(props);

		this.data = [{
			hash : i18n.__("Installation.info.A.hash"),
			title : i18n.__("Installation.info.A.title"),
			desciption : [
				i18n.__("Installation.info.A.desciption")
			]
		},{
			hash : i18n.__("Installation.info.B.hash"),
			title : i18n.__("Installation.info.B.title"),
			desciption : [
				i18n.__("Installation.info.B.desciption.A"),
				i18n.__("Installation.info.B.desciption.B"),
				i18n.__("Installation.info.B.desciption.C"),
				i18n.__("Installation.info.B.desciption.D")
			]
		},{
			hash : i18n.__("Installation.info.C.hash"),
			title : i18n.__("Installation.info.C.title"),
			desciption : [
				i18n.__("Installation.info.C.desciption.A"),
				i18n.__("Installation.info.C.desciption.B"),
				i18n.__("Installation.info.C.desciption.C")
			]
		},{
			hash : i18n.__("Installation.info.D.hash"),
			title : i18n.__("Installation.info.D.title"),
			desciption : [
				i18n.__("Installation.info.D.desciption")
			]
		}];

		let select = 0;

		_.map(this.data, (e, k)=>{
			if(e.hash === FlowRouter.current().context.hash){
				select = k;
			}
		});



		this.state = {
			selected : select >= this.data.length ? false : select
		}


	}
	handleClickOnLink(k, event){
		event.preventDefault();

		Utilities.scrollTo('contentListItemContainer', 100);

		this.setState({
			selected : k
		});
	}
	render() {
		return (
			<div className="container">
				<div className="contents-list">
					<ul className="contents-selector-list">
						{
							this.data.map((d, k) => (
								<li key={k} className={'contents-selector-list__item '}>
									<a
										className={"contents-selector-list__button " + (this.state.selected === k ? 'selected' : "")}
										onClick={this.handleClickOnLink.bind(this, k)}
										href={FlowRouter.path("installation") + "#" + d.title.split(" ").join("_")}
									>
										{d.title}
									</a>
								</li>
							))
						}
					</ul>

					<div id="contentListItemContainer" className="contents-list__item">
						{
							this.data.map((d, k) => (
								<div id={d.hash} key={k} className={this.state.selected === k ? "" : "hidden"}>
									{
										d.desciption.map((desc, k) => (
											<p key={k} >{desc}</p>
										))
									}
								</div>
							))
						}
					</div>
				</div>
			</div>
		);
	}
}
