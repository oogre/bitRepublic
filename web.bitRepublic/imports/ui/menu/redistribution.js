/*----------------------------------------*\
  bitRepublic - redistribution.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-02-01 15:13:25
  @Last Modified time: 2018-04-18 14:59:08
\*----------------------------------------*/
import React, { Component } from 'react';

export default class RedistriutionMenu extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<div className="hero-banner hero-banner--redistribution">
					<div className="container">
						<div className="hero-banner__content">
							<h2 className="hero-banner__title">TAKE PART OF THE REDISTRIBUTION MECHANISM</h2>
							<ul className="buttons-list buttons-list--redistribution">
								<li className="buttons-list__item">
									{
										FlowRouter.current().path == FlowRouter.path("redistribution") ?
											<a
												className="button--secondary hero-banner__button"
												href={FlowRouter.path("home") + "#taxbot"}
											>
												Genereate your wallet
											</a>
										:
											<a
												href={FlowRouter.path("redistribution")}
												className="button--secondary hero-banner__button"
											>
												Join the campaign
											</a>
									}

								</li>
								<li className="buttons-list__item">
									{
										FlowRouter.current().path == FlowRouter.path("redistribution") ?
											
											<a
												href={FlowRouter.path("redistribution") + "#redistributionInfo"}
												className="button--secondary hero-banner__button"
											>
												Find out more
											</a>
										:
											<a
												className="button--secondary hero-banner__button"
												href={FlowRouter.path("about")}
											>
												Find out more
											</a>

									}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
