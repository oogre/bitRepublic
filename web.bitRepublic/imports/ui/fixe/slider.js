import React, { Component } from 'react';
import { GetContentSlider } from '../../api/images/methods.js';

// App component - represents the whole app
export default class FixeSlider extends Component {
	constructor(props){
		super(props);
		this.state = {
			pictures : false,
			anim : true,
		}
		this.x = 0;
	}
	animation(flag){
		if(!this.state.anim) return ;
		$('.slider').animate({
			scrollLeft: flag ? ($('.slider ul').width() - window.innerWidth) : 0
		}, 10000);
		
		setTimeout(this.animation.bind(this, !flag), 11000)
	}
	componentDidMount(){

		setTimeout(this.animation.bind(this, true), 3000);
	}
	componentWillUnmount(){
		//window.removeEventListener("keyup", this.handleKeyPress.bind(this), false);
	}
	render() {
		GetContentSlider.call({}, (err, res) =>{
			this.setState({'is-loading' : false});
			if (err && err.error === 'validation-error') {
				this.setState({'has-error' : true});
				err.details.forEach((fieldError) => {
					this.setState({
						["error-"+fieldError.name] : fieldError.type
					});
				});
				return;
			}
			this.setState({'has-success' : true, pictures : res.data});
		});

		return (
			<div className="slider" style={{
				width: "100%",
    			height: "300px",
    			overflowX: "scroll",
    			overflowY: "hidden"
    		}}>
				{ 	
					this.state.pictures ?
						<ul style={{
							height: "100%",
							margin: "0",
							padding: "0",
							listStyleType : "none",
							width: "3000px"
						}}>
							{
								this.state.pictures.map((picture, k) => (
									<li	key={k} style={{ display: "inline-block"}}>
										<img
											src={"/"+picture}
											alt="image de bitRepublic"
											style={{ maxHeight: "300px"}}
										/>
									</li>
								))
							}
							{
								this.state.pictures.map((picture, k) => (
									<li	key={k} style={{ display: "inline-block"}}>
										<img
											src={"/"+picture}
											alt="image de bitRepublic"
											style={{ maxHeight: "300px"}}
										/>
									</li>
								))
							}
							{
								this.state.pictures.map((picture, k) => (
									<li	key={k} style={{ display: "inline-block"}}>
										<img
											src={"/"+picture}
											alt="image de bitRepublic"
											style={{ maxHeight: "300px"}}
										/>
									</li>
								))
							}
						</ul>
				 	:
				 		null
				}
			</div>
		);
	}
}
