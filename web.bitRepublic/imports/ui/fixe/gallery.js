import React, { Component } from 'react';
import { GetContentGallery } from '../../api/images/methods.js';

// App component - represents the whole app
export default class FixeGallery extends Component {
	constructor(props){
		super(props);
		this.state = {
			pictures : false,
			selected : false,

		}
		this.large = {
			maxWidth: "100%",
    		maxHeight: "100%"
		}
	}
	handleSelectPicture (k){
		this.setState({'selected' : k});
	}
	handleKeyPress(event){
		if( (!_.isArray(this.state.pictures)) || (!_.isNumber(this.state.selected)) ) return;

		if(event.key == "ArrowLeft"){
			this.setState({
				'selected' : (this.state.selected - 1 + this.state.pictures.length) % this.state.pictures.length
			});
		}else if(event.key == "ArrowRight"){
			this.setState({
				'selected' : (this.state.selected + 1 + this.state.pictures.length) % this.state.pictures.length
			});
		}else if(event.key == "Escape"){
			this.setState({
				'selected' : false
			});
		}
	}
	componentWillMount(){
		window.addEventListener('keyup', this.handleKeyPress.bind(this));
	}
	componentWillUnmount(){
		window.removeEventListener("keyup", this.handleKeyPress.bind(this));
	}
	render() {
		GetContentGallery.call({}, (err, res) =>{
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
			<div className="container">
				{ 	
					this.state.pictures ?
						<ul>
							{
								this.state.pictures.map((picture, k) => (
									<li	key={k}>
										<img
											className={this.state.selected === k ? "selected" : ""}
											style={this.state.selected === k ? this.large : {maxWidth: 100 + 'px'}}
											src={"/"+picture}
											onClick={this.handleSelectPicture.bind(this, k)}
											alt="image de bitRepublic"
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
