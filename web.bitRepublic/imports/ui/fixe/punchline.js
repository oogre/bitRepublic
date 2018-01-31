import React, { Component } from 'react';

// App component - represents the whole app
export default class FixePunchline extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="punchline">
				<div className="container">
					{
						this.props.title ? 
							<h2 className="hero-banner__title">
								{this.props.title}
							</h2>
						:
							null
					}
					{
						this.props.description ? 
							this.props.description.map((description, k) => (
								<p key={k}>{description}</p>
							))
						:
							null
					}
					{
						this.props.children ? 
							<ul className="buttons-list">
								{
									React.Children.map(this.props.children, (child, k) =>(
										<li className="buttons-list__item" key={k}>
											{child}
										</li>
									))
								}
							</ul>
						:
							null
					}
				</div>
			</div>
		);
	}
}
