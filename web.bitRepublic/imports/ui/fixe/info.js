/*----------------------------------------*\
  bitRepublic - info.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 22:11:26
  @Last Modified time: 2018-04-09 18:18:48
\*----------------------------------------*/
import React, { Component } from 'react';

// App component - represents the whole app
export default class FixeInfo extends Component {
	constructor(props){
		super(props);


		this.data = [{
			hash : "what",
			title : "what",
			desciption : "0 The Bitsoil Tax campaign aims to mobilize users of social media platforms and other tech tools to claim a microtax on their data and therein make a call for fair distribution of the wealth of the digital economy. The campaign consists of a band tax-collector bots on Twitter which sensibilize Twitter users about the value of their data.",
		},{
			hash : "how_it_works",
			title : "how it works",
			desciption : "1  The Bitsoil Tax campaign aims to mobilize users of social media platforms and other tech tools to claim a microtax on their data and therein make a call for fair distribution of the wealth of the digital economy. The campaign consists of a band tax-collector bots on Twitter which sensibilize Twitter users about the value of their data.",
		},{
			hash : "actions",
			title : "actions",
			desciption : "2   The Bitsoil Tax campaign aims to mobilize users of social media platforms and other tech tools to claim a microtax on their data and therein make a call for fair distribution of the wealth of the digital economy. The campaign consists of a band tax-collector bots on Twitter which sensibilize Twitter users about the value of their data.",
		},{
			hash : "calendar",
			title : "calendar",
			desciption : "3    The Bitsoil Tax campaign aims to mobilize users of social media platforms and other tech tools to claim a microtax on their data and therein make a call for fair distribution of the wealth of the digital economy. The campaign consists of a band tax-collector bots on Twitter which sensibilize Twitter users about the value of their data.",
		},{
			hash : "contact",
			title : "contact",
			desciption : "4     The Bitsoil Tax campaign aims to mobilize users of social media platforms and other tech tools to claim a microtax on their data and therein make a call for fair distribution of the wealth of the digital economy. The campaign consists of a band tax-collector bots on Twitter which sensibilize Twitter users about the value of their data.",
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
	handleClickOnLink(k){
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

					<div className="contents-list__item">
						{
							this.data.map((d, k) => (
								<div id={d.hash} key={k} className={this.state.selected === k ? "" : "hidden"}>
									<p>{d.desciption}</p>
								</div>
							))
						}
					</div>
				</div>
			</div>
		);
	}
}
