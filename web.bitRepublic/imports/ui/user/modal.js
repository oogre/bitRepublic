/*----------------------------------------*\
  bitRepublic - modal.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-31 19:46:12
  @Last Modified time: 2018-05-02 15:28:42
\*----------------------------------------*/
import React, { Component } from 'react';
// https://reactcommunity.org/react-modal/
import ReactModal from 'react-modal';


import UserSignup from './signup.js';
import UserLogIn from './login.js';
import TargetSelector from '../target/selector.js';

ReactModal.setAppElement('body');

export default class UserModal extends Component {
	constructor(props){
		super(props);
		this.state = {
			showModal: false,
			selectedProcess : this.props.process,
			login : false
		};
		this.closeCallBack = null;
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}


	handleForgotPassword(event){
		if(this.state.selectedProcess){
			console.log("YO");
			this.state.login.handleForgotPassword(event);
		}
	}

	componentDidMount () {
		if (this.props.onMounted) {
			this.props.onMounted(this)
		}
	}
	onClose(callback){
		if(!_.isFunction(callback))return;
		this.closeCallBack = callback;
	}
	handleOpenModal () {
		this.setState({ showModal: true });

	}
	handleChangeProcess(selectedProcess){
		this.setState({ selectedProcess: selectedProcess })
	}

	handleCloseModal (event, target) {
		if(_.isObject(event))event.preventDefault();
		this.setState({
			showModal: false,
			selectedProcess: this.props.process
		});
		this.closeCallBack(_.isString(event) ? event : false, target);
		return false;
	}
	handleLonginMounted(login){
		this.setState({ login: login });
	}

	render() {
		const modalStyle = {
			overlay : {
				position          : 'fixed',
				top               : 0,
				left              : 0,
				right             : 0,
				bottom            : 0,
				backgroundColor   : 'rgba(40, 40, 40, 0.9)',
				zIndex            : 9999
			},
			content : {
				position                   : 'absolute',
				top                        : '0',
				left                       : '0',
				right                      : '0',
				bottom                     : '0',
				border                     : '0',
				background                 : 'transparent',
				color                      : '#ffffff',
				overflow                   : 'auto',
				WebkitOverflowScrolling    : 'touch',
				borderRadius               : '0',
				outline                    : 'none'
			}
		}
		return (
			<div className="container container--login-box">
				<ReactModal
					isOpen={this.state.showModal || this.props.open}
					contentLabel="User login / modal"
					onRequestClose={this.handleCloseModal.bind(this)}
					style={modalStyle}
					className="modal--login"
				>
					<div className="modal__wrapper">
						<div className="modal__container">
							<svg className="icon-bitsoil-tax" data-name="icon-bitsoil-tax" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 134.84 108.5"><title>BitSoil Tax</title><path fill="#0d0e0f" d="M51 56.83h4V82.4h-4zM62 56.83h4V82.4h-4z"/><path fill="#fff" stroke="#0d0e0f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M37.4 79.78h43.33v27.68H37.4z"/><path fill="none" stroke="#0d0e0f" strokeLinecap="round" strokeLinejoin="bevel" strokeWidth="1.5" d="M80.77 107.45L59.09 91.13l-21.65 16.32h43.33z"/><path fill="#fff" stroke="#0d0e0f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.51" d="M37.4 79.5l21.69 16.6 21.64-16.6H37.4z"/><path fill="#0d0e0f" d="M57.6 1.33h1.8V9.8h-1.8z"/><rect x="17.22" y="46.08" width="4.78" height="9.88" rx="2.29" ry="2.29" transform="rotate(180 19.61 51.025)" fill="#60c660"/><circle cx="58.61" cy="2.82" r="2.82" fill="#0d0e0f"/><path fill="#60c660" d="M10.9 50.27h3.58v1.52H10.9zM13.548 43.403l3.1 1.79-.76 1.317-3.1-1.79zM12.793 57.328l3.1-1.79.76 1.317-3.1 1.79z"/><rect x="122.74" y="42.92" width="9.39" height="3.53" rx="1.63" ry="1.63" fill="#f4c9a2"/><path fill="#f4c9a2" d="M107.33 42.36h13.66v10.51h-13.66z"/><path d="M122.4 38.1l-1.82-4.51 3.59-.47s.08 2.65.3 2.39a5.48 5.48 0 0 1 1.11-.68l.93 1 3.85-3.09-2.06 6.62-5.4.11z" fill="#e09f36"/><rect x="119.38" y="39.47" width="12.72" height="3.49" rx="1.62" ry="1.62" fill="#f4c9a2" stroke="#c96c47" strokeMiterlimit="10" strokeWidth=".6"/><path fill="#e09f36" d="M121.13 43.15l1.85-1.64 1.33 1.44-3.18.2z"/><path fill="#f4c9a2" stroke="#c96c47" strokeMiterlimit="10" strokeWidth=".6" d="M104.97 52.98l16.33-.12 2-.51-2-9.09"/><path d="M120.69 43.44l2.31-1.93s2 2.53 3.78 3a6.15 6.15 0 0 0 3-.38l-4.16-7.11-7.1 1.76-4.15 3.54-7-.06" fill="#f4c9a2" stroke="#c96c47" strokeMiterlimit="10" strokeWidth=".6"/><circle cx="124.95" cy="55.13" r="7.63" fill="#8c7442"/><path d="M130.1 46.42c3.14 1.49 3.81 4.7 4 6.16a11.33 11.33 0 0 1-1.23 6.56c-1.39 2.3-5.05 3.69-7.91 3.67A7.92 7.92 0 0 1 120 61c-3.27-2.74-3-7.13-2.87-8.1.12-1.15.62-6.37 4.25-8.09l1.77 2.76 3.44 2.1z" fill="#8c7442"/><path d="M123.37 46.42l7.14-.06a9 9 0 0 1 4.33 7.64 9.27 9.27 0 0 1-18.52 0v-.71c.17-2.18.95-5.54 4.08-9.63l1.09.28 1.28.33" fill="#e09f36"/><path fill="#704506" d="M122 57.5h7v1h-7zM122 51.5h1v5h-1zM129 50.5h1v8h-1zM124 51.5h4v1h-4zM124 53.5h3v1h-3z"/><path fill="#704506" d="M122 55.5h5v1h-5zM124 51.5h1v2h-1zM127 53.5h1v3h-1zM124 58.5h1v2h-1zM127 58.5h1v2h-1z"/><rect x="121.15" y="49.46" width="9.18" height="2.99" rx="1.38" ry="1.38" fill="#f4c9a2" stroke="#c96c47" strokeMiterlimit="10" strokeWidth=".6"/><rect x="121.03" y="46.44" width="9.42" height="2.99" rx="1.38" ry="1.38" fill="#f4c9a2" stroke="#c96c47" strokeMiterlimit="10" strokeWidth=".6"/><path d="M124 46.44h-2.43a1.87 1.87 0 0 1-2-1.74 1.87 1.87 0 0 1 2-1.74h2.51" fill="#f4c9a2" stroke="#c96c47" strokeMiterlimit="10" strokeWidth=".6"/><path d="M130.46 43a1.61 1.61 0 0 1 1.74 1.74 1.74 1.74 0 0 1-1.74 1.74h-9.3" fill="none" stroke="#c96c47" strokeMiterlimit="10" strokeWidth=".6"/><path fill="#fff" d="M99.46 41.7h11.21v12.19H99.46z"/><path fill="#fff" d="M105 41.5h6v12h-6z"/><path fill="#0d0e0f" d="M109 40.5v16H95.17V40.53L109 40.5z"/><path fill="#fff" d="M33 108.5H0v-2h33zM33 102.5H11v-2h22zM33 96.5H19v-2h14z"/><path d="M93.14 44.38v12.75a.3.3 0 0 1-.3.3H24.3a.3.3 0 0 1-.3-.3V44.89c0-19 15.11-34.83 34.11-35.08a34.59 34.59 0 0 1 11.15 1.68l.82.28a34.42 34.42 0 0 1 11.4 6.72c.22.19.43.38.64.59a34.46 34.46 0 0 1 11.02 25.3z" fill="#e09f36"/><path d="M79.57 36.42a.15.15 0 0 0 .15-.15 21.15 21.15 0 0 0-42.29 0 .15.15 0 0 0 .15.15z" fill="#0d0e0f"/><circle cx="51.68" cy="26.1" r="4.23" fill="#f2f2f2"/><circle cx="51.68" cy="26.1" r="2.82" fill="#0d0e0f"/><path d="M65 10.43c-.74 0-1.48-.07-2.23-.07a34.57 34.57 0 0 0-34.59 34.57v12.52h-4.07a.15.15 0 0 1-.11-.15V44.9C24 25.81 39.57 9.75 58.67 9.83a34.59 34.59 0 0 1 6.33.6z" fill="#d18f30"/><circle cx="65.85" cy="26.1" r="4.23" fill="#f2f2f2"/><circle cx="65.85" cy="26.1" r="2.82" fill="#0d0e0f"/><path fill="#0d0e0f" d="M108 40.5h4v1h-4zM107 53.5h5v1h-5z"/><path fill="#0d0e0f" d="M111 40.5h1v14h-1z"/><rect x="1" y="60.5" width="114" height="15" rx=".57" ry=".57" fill="#0d0e0f"/><path fill="#fcc57c" d="M4 63.5h9v9H4zM15 63.5h9v9h-9zM26 63.5h9v9h-9zM37 63.5h9v9h-9zM48 63.5h9v9h-9zM59 63.5h9v9h-9zM70 63.5h9v9h-9zM81 63.5h9v9h-9zM92 63.5h9v9h-9zM103 63.5h9v9h-9z"/><path fill="#0d0e0f" d="M6 65.5h5v1H6zM6 69.5h5v1H6z"/><path fill="#0d0e0f" d="M6 65.5h1v5H6zM10 65.5h1v5h-1zM8 67.5h2v1H8zM19 65.5h1v5h-1zM31 70.5h-1v-5h1z"/><path fill="#0d0e0f" d="M28 65.5h5v1h-5zM39 65.5h5v1h-5zM39 69.5h5v1h-5zM39 67.5h5v1h-5z"/><path fill="#0d0e0f" d="M39 65.5h1v3h-1zM43 67.5h1v3h-1zM50 65.5h5v1h-5zM50 69.5h5v1h-5z"/><path fill="#0d0e0f" d="M50 65.5h1v5h-1zM54 65.5h1v5h-1zM63 65.5h1v5h-1zM72 65.5h1v5h-1z"/><path fill="#0d0e0f" d="M72 69.5h5v1h-5zM86 70.5h-1v-5h1z"/><path fill="#0d0e0f" d="M83 65.5h5v1h-5zM95 70.5h-1v-5h1z"/><path fill="#0d0e0f" d="M94 65.5h5v1h-5z"/><path fill="#0d0e0f" d="M99 70.5h-1v-5h1z"/><path fill="#0d0e0f" d="M94 67.5h5v1h-5zM109.978 69.768l-.707.708-4.243-4.243.707-.707z"/><path fill="#0d0e0f" d="M105.732 70.478l-.708-.707 4.243-4.243.707.707z"/></svg>
							<a className="modal__close" href="#" onClick={this.handleCloseModal.bind(this)}>&times;</a>
							{
								this.props.selectedBot && !Meteor.userId() && (self.props.selectedBot.target == "ceos" || self.props.selectedBot.target == "politics") ?  
									<span>
										<h2 className="modal__title">Awesome!</h2>
										<span className="modal__subtitle">
											<p>
												Got your tweet.<br/>
												Which world leader you want.
											</p>
										</span>
									</span>
								:
									null
							}
							{
								this.props.selectedBot && !Meteor.userId() && self.props.selectedBot.target != "ceos" && self.props.selectedBot.target != "politics" ?  
									<span>
										<h2 className="modal__title">Hey!</h2>
										<span className="modal__subtitle">
											<p>
												You did it.<br/>
												Got your tweet!
											</p>
										</span>
									</span>
								:
									null
							}

							<UserLogIn
								onMounted={this.handleLonginMounted.bind(this)}
								visible={Meteor.userId() || this.state.selectedProcess == "login"}
								onSuccess={this.handleCloseModal.bind(this)}
							>
								{
									this.props.selectedBot ?
										<TargetSelector
											process={this.props.selectedBot.target}
										/>
									:
										null
								}
							</UserLogIn>
							<UserSignup
								visible={!Meteor.userId() && this.state.selectedProcess == "signup"}
								onSuccess={this.handleCloseModal.bind(this)}
							>
								{
									this.props.selectedBot ?
										<TargetSelector
											process={this.props.selectedBot.target}
										/>
									:
										null
								}
							</UserSignup>


							{
								Meteor.userId() ?
									null
								:
									<div className="field__row field__row--extra-link">
										<a
											className={"modal__link" + " " + (this.state.selectedProcess == "signup" ? "" : "hidden")}
											href="#"
											onClick={this.handleChangeProcess.bind(this, "login")}
										>
											Log in
										</a>

										<span
											className={this.state.selectedProcess == "login" ? "" : "hidden"}
										>
											<a 	className="modal__link"
												onClick={this.handleForgotPassword.bind(this)}>
												forgot password ?
											</a>
											<span> | </span>
											<a
												className="modal__link"
												href="#"
												onClick={this.handleChangeProcess.bind(this, "signup")}
											>
												Sign up
											</a>
										</span>
									</div>
							}

							<div className="modal__share">
								<ul className="buttons-list buttons-list--modal">
									<li className="buttons-list__item">
										<a target="_blank" className="buttons-list__link" href={"https://twitter.com/share?url="+encodeURIComponent(location.href)}>
											<svg className="icon-twitter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.25 19.71"><title>Twitter</title><path d="M24.25 2.33a10 10 0 0 1-2.86.78A5 5 0 0 0 23.58.36a10 10 0 0 1-3.16 1.21 5 5 0 0 0-8.48 4.54A14.13 14.13 0 0 1 1.69.91a5 5 0 0 0 1.54 6.64A5 5 0 0 1 1 6.93V7a5 5 0 0 0 4 4.88 5 5 0 0 1-2.28.12 5 5 0 0 0 4.65 3.46 10 10 0 0 1-6.18 2.13A10.07 10.07 0 0 1 0 17.47a14.08 14.08 0 0 0 7.63 2.24A14.06 14.06 0 0 0 21.78 5.55v-.64a10.11 10.11 0 0 0 2.48-2.58" data-name="icon-twitter"/></svg>
										</a>
									</li>
									<li className="buttons-list__item">
										<a target="_blank" className="buttons-list__link" href={"https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(location.href)}>
											<svg className="icon-facebook" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.97 19.71"><title>Facebook</title><path d="M6.47 19.71v-9h2.94l.44-3.5H6.47V5c0-1 .27-1.71 1.69-1.71H10V.14A23.54 23.54 0 0 0 7.34 0C4.73 0 2.95 1.63 2.95 4.63v2.59H0v3.5h2.95v9z" data-name="icon-facebook"/></svg>
										</a>
									</li>
									<li className="buttons-list__item">
										<a target="_blank" className="buttons-list__link" href={"https://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(location.href)+"&title=bitsoil.tax%2Fcampaign&summary=bitsoil.tax%2Fcampaign&source=bitsoil.tax%2Fcampaign"}>
											<svg className="icon-linkedin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430.117 430.117"><title>Linked-in</title><g data-name="icon-linkedin"><path d="M430.117,261.543V420.56h-92.188V272.193c0-37.271-13.334-62.707-46.703-62.707c-25.473,0-40.632,17.142-47.301,33.724c-2.432,5.928-3.058,14.179-3.058,22.477V420.56h-92.219c0,0,1.242-251.285,0-277.32h92.21v39.309c-0.187,0.294-0.43,0.611-0.606,0.896h0.606v-0.896c12.251-18.869,34.13-45.824,83.102-45.824C384.633,136.724,430.117,176.361,430.117,261.543z M52.183,9.558C20.635,9.558,0,30.251,0,57.463c0,26.619,20.038,47.94,50.959,47.94h0.616c32.159,0,52.159-21.317,52.159-47.94C103.128,30.251,83.734,9.558,52.183,9.558z M5.477,420.56h92.184v-277.32H5.477V420.56z"/></g></svg>
										</a>
									</li>
									{/*<li className="buttons-list__item">
										<a target="_blank" className="buttons-list__link" href={""}>
											<svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.71 19.71"><title>Instagram</title><g data-name="icon-instagram"><path d="M14.27 0H5.44A5.45 5.45 0 0 0 0 5.44v8.83a5.44 5.44 0 0 0 5.44 5.44h8.83a5.45 5.45 0 0 0 5.44-5.44V5.44A5.45 5.45 0 0 0 14.27 0M18 14.27A3.69 3.69 0 0 1 14.27 18H5.44a3.69 3.69 0 0 1-3.69-3.69V5.44a3.69 3.69 0 0 1 3.69-3.69h8.83A3.69 3.69 0 0 1 18 5.44z"/><path d="M9.49 4.78a5.08 5.08 0 1 0 5.08 5.08 5.08 5.08 0 0 0-5.08-5.08m0 8.41a3.33 3.33 0 1 1 3.33-3.33 3.33 3.33 0 0 1-3.33 3.33m5.3-9.9a1.28 1.28 0 1 0 .91.38 1.29 1.29 0 0 0-.91-.38"/></g></svg>
										</a>
									</li>
									<li className="buttons-list__item">
										<a target="_blank" className="buttons-list__link" href={""}>
											<svg width="31px" height="21px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.67 20.12"><title>Mail Us</title><g data-name="icon-mail"><path d="M29.9 20.12H.75L0 19.37V.75L.75 0H29.9l.75.75v18.62zm-28.4-1.5h27.65V1.5H1.5z"/><path d="M29.92 20.12H.78a.75.75 0 0 1-.45-1.35l12.12-9.14a.75.75 0 0 1 .9 1.2L3 18.62h24.68l-10.35-7.79a.75.75 0 0 1 .9-1.2l12.14 9.14a.75.75 0 0 1-.45 1.35z"/><path d="M15.34 12.48a.75.75 0 0 1-.45-.15L.3 1.35A.75.75 0 0 1 .75 0H29.9a.75.75 0 0 1 .45 1.35l-14.56 11a.75.75 0 0 1-.45.13zM3 1.5l12.34 9.29L27.66 1.5z"/></g></svg>
										</a>
									</li>*/}
								</ul>
								<p className="modal__share__text">Spread the word! </p>
							</div>
							<div className="modal__footer">
								<span>
									<a className="modal__link" href={FlowRouter.path("faq")} target="_blank">Faq</a>
								</span>
								{
										this.state.selectedProcess == "signup"
									?
										<span>
											<span> | </span>
											<span>
												<a 
													className="modal__link" 
													href="#"
													onClick={this.handleChangeProcess.bind(this, "login")}
												>Already joined the campaign? Log In</a>
											</span>
										</span>
									: 
										null								
								}								
							</div>
						</div>
					</div>
				</ReactModal>
			</div>
		);
	}
}
