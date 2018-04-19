/*----------------------------------------*\
  bitRepublic - footer.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-25 18:10:49
  @Last Modified time: 2018-03-26 16:01:38
\*----------------------------------------*/
import React, { Component } from 'react';

import { FacebookIcon, TwitterIcon } from 'react-share';

// App component - represents the whole app
export default class FooterMenu extends Component {
	constructor(props){
		super(props);
	}

	render() {
			return (
			<footer className="main-footer">
				<div className="container">
					<nav className="main-footer__nav">
						<div className="column">
							<div className="column__content">
								<p className="menu--footer__title">Contact</p>
								<ul className="menu menu--footer">
									<li className="menu__item">
										<a className="menu__item__link" href={FlowRouter.path("contact")}>mailus@bitsoil.tax</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="column">
							<div className="column__content">
								<p className="menu--footer__title">Spread the word :</p>
								<ul className="buttons-list buttons-list--footer">
									<li className="buttons-list__item">
										<a target="_blank" className="buttons-list__link" href={"https://twitter.com/share?url="+encodeURIComponent(location.href)}>
											{/*<TwitterIcon size={32} round={true} />*/}
											<svg width="34px" height="27px" data-name="icon-twitter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.22 27"><title>Twitter</title><path d="M33.22 3.2a13.63 13.63 0 0 1-3.91 1.07A6.84 6.84 0 0 0 32.3.5 13.64 13.64 0 0 1 28 2.15a6.82 6.82 0 0 0-11.64 6.22 19.35 19.35 0 0 1-14-7.12 6.82 6.82 0 0 0 2.11 9.1 6.79 6.79 0 0 1-3.09-.85v.09a6.82 6.82 0 0 0 5.42 6.67 6.83 6.83 0 0 1-3.08.12 6.82 6.82 0 0 0 6.37 4.73A13.67 13.67 0 0 1 1.63 24 13.8 13.8 0 0 1 0 23.93 19.29 19.29 0 0 0 10.45 27C23 27 29.84 16.61 29.84 7.61v-.88a13.85 13.85 0 0 0 3.4-3.53" /></svg>
										</a>
									</li>
									<li className="buttons-list__item">
										<a target="_blank" className="buttons-list__link" href={"https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(location.href)}>
											{/*<FacebookIcon size={32} round={true} />*/}
											<svg width="14px" height="27px" data-name="icon-facebook" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.66 27"><title>Facebook</title><path d="M8.87 27V14.68h4l.6-4.8h-4.6V6.82c0-1.39.38-2.34 2.32-2.34h2.48V.19A32.25 32.25 0 0 0 10.05 0C6.48 0 4 2.24 4 6.34v3.54H0v4.8h4V27z" /></svg>
										</a>
									</li>
									<li className="buttons-list__item">
										<a target="_blank" className="buttons-list__link" href={"https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(location.href)}>
											<svg width="27px" height="27px" data-name="icon-instagram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27"><title>Instagram</title><path d="M19.55 0H7.45A7.46 7.46 0 0 0 0 7.45v12.1A7.46 7.46 0 0 0 7.45 27h12.1A7.46 7.46 0 0 0 27 19.55V7.45A7.46 7.46 0 0 0 19.55 0m5.05 19.55a5.06 5.06 0 0 1-5.05 5.05H7.45a5.06 5.06 0 0 1-5.05-5.05V7.45A5.06 5.06 0 0 1 7.45 2.4h12.1a5.06 5.06 0 0 1 5.05 5.05z" /><path d="M13 6.54a7 7 0 1 0 7 7 7 7 0 0 0-7-7m0 11.52a4.56 4.56 0 1 1 4.56-4.56A4.57 4.57 0 0 1 13 18.06M20.25 4.51A1.76 1.76 0 1 0 21.5 5a1.76 1.76 0 0 0-1.24-.51" /></svg>
										</a>
									</li>
									<li className="buttons-list__item">
										<a target="" className="buttons-list__link" href="/contact">
											<svg width="38px" height="27px" data-name="icon-mail" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.67 20.12"><title>Contact us</title><path d="M29.9 20.12H.75L0 19.37V.75L.75 0H29.9l.75.75v18.62zm-28.4-1.5h27.65V1.5H1.5z"/><path d="M29.92 20.12H.78a.75.75 0 0 1-.45-1.35l12.12-9.14a.75.75 0 1 1 .9 1.2L3 18.62h24.68l-10.35-7.8a.75.75 0 1 1 .9-1.2l12.14 9.14a.75.75 0 0 1-.45 1.35z"/><path d="M15.34 12.48a.75.75 0 0 1-.45-.15L.3 1.35A.75.75 0 0 1 .75 0H29.9a.75.75 0 0 1 .45 1.35l-14.56 11a.75.75 0 0 1-.45.13zM3 1.5l12.34 9.29L27.66 1.5z"/></svg>
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="column">
							<div className="column__content">
								<p className="menu--footer__title">Partners</p>
							</div>
						</div>
						<div className="column">
							<div className="column__content">
								<p className="menu--footer__title">License</p>
								<ul className="buttons-list buttons-list--footer buttons-list--license">
									<li className="buttons-list__item">
										<a className="buttons-list__link" target="_blank" href="https://creativecommons.org/licenses/by-nc-nd/2.0/be/deed.en">
											<svg width="20px" height="20px" data-name="icon-creatives-commons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.5 19.52"><title>Creative Commons</title><path d="M16.67 2.83a9.43 9.43 0 0 1 2.83 6.93 9.27 9.27 0 0 1-2.78 6.86 9.62 9.62 0 0 1-7 2.9 9.36 9.36 0 0 1-6.86-2.88A9.39 9.39 0 0 1 0 9.76a9.55 9.55 0 0 1 2.88-6.93A9.28 9.28 0 0 1 9.74 0a9.42 9.42 0 0 1 6.93 2.83zM4.15 4.1a7.79 7.79 0 0 0-2.39 5.66 7.67 7.67 0 0 0 2.37 5.61 7.7 7.7 0 0 0 5.64 2.37 7.82 7.82 0 0 0 5.69-2.39 7.45 7.45 0 0 0 2.29-5.59 7.72 7.72 0 0 0-2.33-5.68 7.7 7.7 0 0 0-5.66-2.32A7.56 7.56 0 0 0 4.15 4.1zm4.2 4.71A1.17 1.17 0 0 0 7.25 8Q6 8 6 9.75t1.29 1.74a1.25 1.25 0 0 0 1.22-.85l1.19.64a2.76 2.76 0 0 1-2.6 1.51A2.82 2.82 0 0 1 5 12a3 3 0 0 1-.8-2.24A3 3 0 0 1 5 7.55a2.76 2.76 0 0 1 2-.82 2.72 2.72 0 0 1 2.64 1.42zm5.61 0A1.16 1.16 0 0 0 12.88 8q-1.32 0-1.32 1.74t1.32 1.74a1.21 1.21 0 0 0 1.2-.85l1.22.64a2.76 2.76 0 0 1-2.55 1.52 2.82 2.82 0 0 1-2.1-.81 3 3 0 0 1-.79-2.22 3 3 0 0 1 .8-2.21 2.74 2.74 0 0 1 2-.82 2.71 2.71 0 0 1 2.58 1.42z"/></svg>
											<svg width="20px" height="20px" data-name="icon-attribution" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.52 19.52"><title>Attribution</title><path d="M12.39 7.34a.63.63 0 0 0-.63-.63h-4a.63.63 0 0 0-.63.63v4h1.12v4.73h3v-4.73h1.11v-4z"/><circle cx="9.76" cy="4.82" r="1.37"/><path d="M9.75 0a9.3 9.3 0 0 0-6.87 2.83A9.54 9.54 0 0 0 0 9.76a9.39 9.39 0 0 0 2.88 6.88 9.38 9.38 0 0 0 6.87 2.88 9.64 9.64 0 0 0 7-2.9 9.26 9.26 0 0 0 2.79-6.86 9.42 9.42 0 0 0-2.83-6.93A9.44 9.44 0 0 0 9.75 0zm0 1.76a7.65 7.65 0 0 1 5.67 2.34 7.65 7.65 0 0 1 2.35 5.66 7.45 7.45 0 0 1-2.3 5.59 7.84 7.84 0 0 1-5.69 2.39 7.71 7.71 0 0 1-5.65-2.37 7.67 7.67 0 0 1-2.37-5.61A7.79 7.79 0 0 1 4.15 4.1a7.57 7.57 0 0 1 5.62-2.34z"/></svg>
											<svg width="20px" height="20px" data-name="icon-no-derivatives" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.53 19.52"><title>No Derivatives</title><path d="M9.75 0a9.3 9.3 0 0 0-6.87 2.83A9.54 9.54 0 0 0 0 9.76a9.38 9.38 0 0 0 2.88 6.88 9.38 9.38 0 0 0 6.87 2.88 9.64 9.64 0 0 0 7-2.9 9.27 9.27 0 0 0 2.79-6.86 9.42 9.42 0 0 0-2.83-6.93A9.45 9.45 0 0 0 9.75 0zm0 1.76a7.65 7.65 0 0 1 5.67 2.34 7.65 7.65 0 0 1 2.34 5.66 7.45 7.45 0 0 1-2.3 5.59 7.84 7.84 0 0 1-5.69 2.39 7.71 7.71 0 0 1-5.64-2.37 7.66 7.66 0 0 1-2.37-5.61 7.78 7.78 0 0 1 2.4-5.66 7.57 7.57 0 0 1 5.61-2.34z"/><path d="M13.45 7.45H6.36v1.68h7.1zm0 3.14H6.36v1.68h7.1z"/></svg>
											<svg width="20px" height="20px" data-name="icon-non-commercial" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.53 19.53"><title>Non Commercial</title><path d="M16.69 2.83A9.44 9.44 0 0 0 9.75 0a9.31 9.31 0 0 0-6.87 2.83A9.55 9.55 0 0 0 0 9.76a9.39 9.39 0 0 0 2.88 6.88 9.38 9.38 0 0 0 6.87 2.88 9.64 9.64 0 0 0 7-2.9 9.27 9.27 0 0 0 2.79-6.86 9.42 9.42 0 0 0-2.85-6.93zm-1.22 12.52a7.84 7.84 0 0 1-5.69 2.39 7.71 7.71 0 0 1-5.64-2.37 7.67 7.67 0 0 1-2.38-5.61 7.79 7.79 0 0 1 .43-2.6l2.59 1.15h-.19v1.16h.92v.77h-.9v1.16h1.04a4.6 4.6 0 0 0 .92 2.12 4.92 4.92 0 0 0 4 1.86 5.5 5.5 0 0 0 2.55-.62L12.71 13a4.53 4.53 0 0 1-1.86.43 2.74 2.74 0 0 1-2.11-.83 2.56 2.56 0 0 1-.54-1.2h3.55l5 2.23a7.54 7.54 0 0 1-1.28 1.72zm-6.35-5.11zm3-.77h.15V8.31H9.54l-1.12-.5a2.23 2.23 0 0 1 .34-.56 2.49 2.49 0 0 1 2-.88 4.81 4.81 0 0 1 1.81.39L13 4.9a6.2 6.2 0 0 0-2.45-.49 4.78 4.78 0 0 0-4.29 2.45L3.05 5.44a9 9 0 0 1 1.1-1.34 7.57 7.57 0 0 1 5.62-2.34 7.65 7.65 0 0 1 5.65 2.34 7.66 7.66 0 0 1 2.35 5.66 8.49 8.49 0 0 1-.25 2.08z"/></svg>
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="column">
							<div className="column__content">
								<p className="menu--footer__title">Supported by</p>
								<ul className="buttons-list buttons-list--footer">
									<li className="buttons-list__item">
										<a className="buttons-list__link--fsoa" target="_blank" href="http://www.kunstenenerfgoed.be/">
											<svg width="43px" height="86px" data-name="icon-flanders-state-of-the-art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.61 85.04"><title>Flanders State of the Art</title><path className="icon-flanders-state-of-the-art__background" d="M42.62 46.02L0 34.09V0h42.62v46.02z"/><path className="icon-flanders-state-of-the-art__foreground" d="M42.62 85.04H0V33.9l42.62 11.93v39.21zM36.78 21.58c-1.07-.81-1.57 0-2.24 0s-1.1-1-1.54-.74c-.84.43.33 1.94.85 2.24a12.55 12.55 0 0 0 1.16.59 1.7 1.7 0 0 1 1 1.54 2.94 2.94 0 0 1 0 .74c-.3 1.31-2.59 2.49-3.91 1.6a3 3 0 0 1-1.38-1.94c-.35-1.72-1.59-3-2-4.66-.24-1-.42-2.1-.69-3.13s-.55-2.11-.77-3.08a27.64 27.64 0 0 0-.94-3.05c-1.25-3.28-1.82-3-1.82-3s.46.91 2.12 8.94a47 47 0 0 0 1.11 5c.16.42.43 1.31.61 1.7.53 1.15 1.92 2.9 2 4.47.05.91.16 1.66.18 2.35a7.53 7.53 0 0 0 .23 1.38c.34 1 3.09 4.06 6 4.06v-2.4a10.66 10.66 0 0 1-5.7-1.8 6.34 6.34 0 0 1 .35-1.68 2.75 2.75 0 0 1 2.36-1.92 17.57 17.57 0 0 1 3 .31zM24.17 13.07c-.11 1.76-2.83 4.16-3.68 5.7a11.33 11.33 0 0 0-1.06 2.81A7.49 7.49 0 0 0 20 26.2c.9 2.16-.12 2.95.58 2.51.87-.71.74-2.36.67-3.4a14.55 14.55 0 0 1 0-2.79 13.17 13.17 0 0 1 2.34-5.28 4.82 4.82 0 0 0 .51-4.18M24.72 18.06s.29 1.39-.94 5c-3.21 9.36 2.92 10.24 4.67 12.45 0 0 .68-1-2.11-4-1-1.12-1.93-3.57-1.13-7.08 1.15-5.08-.49-6.33-.49-6.33M18.65 11.92a4.52 4.52 0 0 1-.16-1.49c.15-2.2 2.14-3.09 2.64-3.42 0 0 .9-.61 1-1.23A3 3 0 0 1 21 9.42a6 6 0 0 0-2.31 2.5M23.68 9.8c.11.22.94 1.44-2.45 4.23s-2.33 4.79-2.33 4.79-3.61-2 .55-5.48 3.31-4.17 3.31-4.17a1 1 0 0 1 .92.63M28.08 10.87c.59.08 1 1.9 2.31 2.3 1 .29 2.05.13 2.29.73-.46.24-.1 1 .36.91.39-1.06.58-5.19-4.96-3.94zm1.82.82c0-.13.12 0 .27-.12a1.65 1.65 0 0 1 .58-.48 1 1 0 0 1 .61 0c.12 0 0 .32 0 .4s-.72-.09-.72.32c0 .66.9 0 1.36 0 .18 1.66-2.49 1.19-2.09-.12z"/><path className="icon-flanders-state-of-the-art__background" d="M7.64 52.05h3.3V53H8.58v1.32h2.27v.91H8.58v2.2h-.94zM11.54 51.6l.83-.08h.12v5.88h-.95zM16.77 57.48a1.14 1.14 0 0 1-.47-.09 1.32 1.32 0 0 1-.47-.35 2.46 2.46 0 0 1-.49.31 1.5 1.5 0 0 1-.65.13 1.87 1.87 0 0 1-.62-.1 1.09 1.09 0 0 1-.54-.39 1.42 1.42 0 0 1-.23-.85 1.08 1.08 0 0 1 .32-.86 1.73 1.73 0 0 1 1.16-.28h.86v-.21a.75.75 0 0 0-.24-.62.9.9 0 0 0-.58-.17 2.25 2.25 0 0 0-.57.09 3.21 3.21 0 0 0-.56.2l-.22-.83A3.72 3.72 0 0 1 15 53.1a1.82 1.82 0 0 1 1.1.31 1.27 1.27 0 0 1 .47 1.08v1.57a.54.54 0 0 0 .18.44.94.94 0 0 0 .45.19zm-1.13-1.78a5.13 5.13 0 0 0-1 0 .4.4 0 0 0-.37.43.53.53 0 0 0 .59.54 1 1 0 0 0 .49-.13.67.67 0 0 0 .31-.62zM17.78 53.19h.8l.09.33a2.47 2.47 0 0 1 1.33-.41 1.61 1.61 0 0 1 1.07.35 1.45 1.45 0 0 1 .46 1.14v2.8h-.95v-2.52a.81.81 0 0 0-.29-.67 1.07 1.07 0 0 0-.67-.19 1.77 1.77 0 0 0-.92.26v3.12h-.95zM26.13 57.4h-.72l-.17-.32a1.78 1.78 0 0 1-1.13.4 1.65 1.65 0 0 1-1.35-.62 2.25 2.25 0 0 1-.44-1.4 2.41 2.41 0 0 1 .64-1.78 2.23 2.23 0 0 1 1.61-.58 4.9 4.9 0 0 1 .62 0v-1.5l.8-.08h.15zm-.95-3.32a2.85 2.85 0 0 0-.68-.08 1.17 1.17 0 0 0-.88.32 1.36 1.36 0 0 0-.33 1 1.51 1.51 0 0 0 .26.87.9.9 0 0 0 .76.4 1.72 1.72 0 0 0 .86-.26zM30.3 56.31v.92a2.41 2.41 0 0 1-.6.19 3.22 3.22 0 0 1-.6.06 2.23 2.23 0 0 1-1.52-.54 2.14 2.14 0 0 1-.65-1.64 2.28 2.28 0 0 1 .59-1.63 1.8 1.8 0 0 1 1.3-.56 2 2 0 0 1 .62.1 1.48 1.48 0 0 1 .72.53 2.14 2.14 0 0 1 .35 1.26v.63H28a1.1 1.1 0 0 0 .48.72 1.4 1.4 0 0 0 .77.21 2.28 2.28 0 0 0 1.06-.28zm-.65-1.41a1.06 1.06 0 0 0-.28-.67.73.73 0 0 0-.52-.2.84.84 0 0 0-.56.21 1.12 1.12 0 0 0-.35.67zM33.83 54.23a1.34 1.34 0 0 0-.71-.21 1.39 1.39 0 0 0-.85.31v3.07h-.95v-4.21h.8l.1.34a1.64 1.64 0 0 1 1.07-.43 2.44 2.44 0 0 1 .43 0 1.42 1.42 0 0 1 .41.13zM34.44 56.3a2.88 2.88 0 0 0 .46.19 1.84 1.84 0 0 0 .58.1 1 1 0 0 0 .48-.11.42.42 0 0 0 .22-.38.45.45 0 0 0-.28-.41 1.67 1.67 0 0 0-.28-.11 4.52 4.52 0 0 1-.65-.24 1 1 0 0 1-.49-.51 1.29 1.29 0 0 1 .37-1.41 1.67 1.67 0 0 1 1-.29 2.89 2.89 0 0 1 .94.16v.85a1.59 1.59 0 0 0-.73-.17 1.07 1.07 0 0 0-.47.09.32.32 0 0 0-.2.28c0 .15.11.24.28.32l.28.11a3.72 3.72 0 0 1 .64.27 1.08 1.08 0 0 1 .48.56 1.33 1.33 0 0 1 .07.47 1.27 1.27 0 0 1-.49 1.07 1.84 1.84 0 0 1-1.12.34 2 2 0 0 1-1.08-.29zM16.17 63.9a2 2 0 0 0 .41.12 2.64 2.64 0 0 0 .51.05 1.34 1.34 0 0 0 .67-.15.59.59 0 0 0 .3-.54.65.65 0 0 0-.37-.6c-.17-.1-.39-.22-.61-.33a3.49 3.49 0 0 1-.56-.32 1 1 0 0 1-.33-.8 1 1 0 0 1 .4-.88 1.51 1.51 0 0 1 .9-.25 2.65 2.65 0 0 1 .74.11v.42a3.83 3.83 0 0 0-.73-.09 1.15 1.15 0 0 0-.59.13.55.55 0 0 0-.26.51.54.54 0 0 0 .18.44 2.63 2.63 0 0 0 .52.3 7.3 7.3 0 0 1 .66.36 1.27 1.27 0 0 1 .38.33 1 1 0 0 1 .15.54 1.13 1.13 0 0 1-.47 1 1.75 1.75 0 0 1-1 .31 2 2 0 0 1-.86-.18zM18.94 61.16h.37v-.59l.46-.09v.68h.92v.46h-.89v1.62a1 1 0 0 0 .17.64.51.51 0 0 0 .42.19 1.29 1.29 0 0 0 .62-.2l.13.45a2 2 0 0 1-.81.2.94.94 0 0 1-.73-.3 1.42 1.42 0 0 1-.3-1v-1.6h-.37zM24 64.53a.85.85 0 0 1-.5-.46 1.39 1.39 0 0 1-.43.33 1.34 1.34 0 0 1-.59.13 1.22 1.22 0 0 1-.7-.2.93.93 0 0 1-.37-.82.86.86 0 0 1 .29-.71 1.53 1.53 0 0 1 1-.25h.66v-.41a.63.63 0 0 0-.18-.5.68.68 0 0 0-.44-.13 2.07 2.07 0 0 0-1 .24l-.13-.43a4.12 4.12 0 0 1 .57-.2 2.54 2.54 0 0 1 .63-.06 1.07 1.07 0 0 1 .72.23 1.08 1.08 0 0 1 .31.86v1a1.29 1.29 0 0 0 .07.5.57.57 0 0 0 .38.33zM23.36 63a5 5 0 0 0-1.06.05.43.43 0 0 0-.38.45.51.51 0 0 0 .24.46.64.64 0 0 0 .31.1 1.07 1.07 0 0 0 .58-.14.71.71 0 0 0 .31-.66zM24.57 61.16h.37v-.59l.46-.09v.68h.92v.46h-.92v1.62a1 1 0 0 0 .17.64.51.51 0 0 0 .42.19 1.29 1.29 0 0 0 .62-.2l.13.45a2 2 0 0 1-.81.2.94.94 0 0 1-.73-.3 1.42 1.42 0 0 1-.3-1v-1.6h-.37zM29.62 62.94h-2.06a1.27 1.27 0 0 0 .35.85 1 1 0 0 0 .74.28 2 2 0 0 0 .89-.24v.45a2.08 2.08 0 0 1-.95.24 1.48 1.48 0 0 1-1.08-.42 1.84 1.84 0 0 1-.46-1.33 1.94 1.94 0 0 1 .34-1.19 1.28 1.28 0 0 1 1.08-.48 1.13 1.13 0 0 1 .74.22 1 1 0 0 1 .32.53 2.57 2.57 0 0 1 .07.64zm-.48-.45a1.38 1.38 0 0 0-.14-.66.55.55 0 0 0-.52-.28.79.79 0 0 0-.6.26 1.26 1.26 0 0 0-.29.67zM32 62.82a1.85 1.85 0 0 1 .43-1.22 1.44 1.44 0 0 1 2.19 0 2 2 0 0 1 0 2.42 1.44 1.44 0 0 1-1.1.5 1.39 1.39 0 0 1-1.09-.5 1.85 1.85 0 0 1-.43-1.2zm.49 0a1.48 1.48 0 0 0 .26.89.93.93 0 0 0 .78.38.91.91 0 0 0 .75-.35 1.45 1.45 0 0 0 .25-.88 1.54 1.54 0 0 0-.25-.9.9.9 0 0 0-.77-.38.92.92 0 0 0-.76.36 1.45 1.45 0 0 0-.25.86zM35.42 61.16H36a1.51 1.51 0 0 1 .28-1 .89.89 0 0 1 .71-.28 2.6 2.6 0 0 1 .77.14l-.13.43a1.91 1.91 0 0 0-.58-.12.46.46 0 0 0-.4.18 1.12 1.12 0 0 0-.15.66h.75v.45h-.75v2.85H36v-2.86h-.53zM18.07 68.18h.37v-.59l.46-.09v.68h.92v.46h-.92v1.62a1 1 0 0 0 .17.64.51.51 0 0 0 .42.19 1.29 1.29 0 0 0 .62-.2l.13.45a2 2 0 0 1-.81.2.94.94 0 0 1-.73-.3 1.42 1.42 0 0 1-.3-1v-1.6h-.37zM20.83 66.94l.46-.06v1.57a2.75 2.75 0 0 1 .45-.22 1.4 1.4 0 0 1 .47-.1 1.18 1.18 0 0 1 .82.28 1.26 1.26 0 0 1 .35 1v2.11h-.49V69.4a.89.89 0 0 0-.21-.65.72.72 0 0 0-.51-.17 1.24 1.24 0 0 0-.46.1 3.39 3.39 0 0 0-.41.22v2.59h-.49zM26.69 70h-2.06a1.27 1.27 0 0 0 .35.85 1 1 0 0 0 .74.28 2 2 0 0 0 .89-.24v.45a2.08 2.08 0 0 1-.95.24 1.48 1.48 0 0 1-1.08-.42 1.84 1.84 0 0 1-.46-1.33 1.94 1.94 0 0 1 .34-1.19 1.28 1.28 0 0 1 1.08-.48 1.13 1.13 0 0 1 .74.22 1 1 0 0 1 .32.53 2.57 2.57 0 0 1 .07.64zm-.48-.45a1.38 1.38 0 0 0-.14-.66.55.55 0 0 0-.52-.28.79.79 0 0 0-.6.26 1.27 1.27 0 0 0-.29.67zM31.6 70.51h-1.85l-.34 1h-.51l1.44-4.19H31l1.44 4.19h-.51zM29.9 70h1.54l-.77-2.23zM33 68.18h.33l.11.38a1.07 1.07 0 0 1 .81-.44h.28a1.21 1.21 0 0 1 .27.09l-.17.44a1.19 1.19 0 0 0-.45-.1.84.84 0 0 0-.68.44v2.47H33zM35.09 68.18h.37v-.59l.46-.09v.68h.92v.46H36v1.62a1 1 0 0 0 .17.64.51.51 0 0 0 .42.19 1.29 1.29 0 0 0 .62-.2l.13.45a2 2 0 0 1-.81.2.94.94 0 0 1-.73-.3 1.42 1.42 0 0 1-.3-1v-1.6h-.37z" /></svg>
										</a>
									</li>
									<li className="buttons-list__item">
										<a className="buttons-list__link buttons-list__link" target="_blank" href="http://www.vgc.be/ondersteuning/subsidies/cultuur/subsidies-kunsten">
											<svg width="64px" height="32px" id="icon-vgc" data-name="icon-vgc" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63.23 32"><title>Vlaamse Gemeenschapscommissie</title><path d="M63.23 24.6v7.29h-1.17V24.7l1-.1zM60 28.79a1.26 1.26 0 0 0-.34-.84.89.89 0 0 0-.66-.25 1 1 0 0 0-.68.26 1.44 1.44 0 0 0-.43.83zm.8 1.75v1.14a3.49 3.49 0 0 1-1.5.32 2.74 2.74 0 0 1-1.87-.67 2.67 2.67 0 0 1-.8-2 2.85 2.85 0 0 1 .73-2 2.21 2.21 0 0 1 1.6-.69 2.41 2.41 0 0 1 .76.13 1.82 1.82 0 0 1 .89.66 2.67 2.67 0 0 1 .39 1.5v.79h-3.11a1.37 1.37 0 0 0 .59.89 1.71 1.71 0 0 0 .94.26 2.8 2.8 0 0 0 1.3-.34zm-8 0a3.44 3.44 0 0 0 .57.24 2.23 2.23 0 0 0 .71.13 1.18 1.18 0 0 0 .59-.14.52.52 0 0 0 .27-.47c0-.34-.24-.49-.56-.61l-.52-.18a1.55 1.55 0 0 1-.93-.65 1.29 1.29 0 0 1-.16-.7 1.43 1.43 0 0 1 .54-1.19 2 2 0 0 1 1.25-.36 3.51 3.51 0 0 1 1.15.2v1.06h-.06a2 2 0 0 0-.89-.21 1.32 1.32 0 0 0-.57.11.39.39 0 0 0-.25.35c0 .25.24.37.56.49l.52.18a1.64 1.64 0 0 1 .92.73 1.5 1.5 0 0 1 .16.74 1.59 1.59 0 0 1-.61 1.32 2.26 2.26 0 0 1-1.38.42 2.47 2.47 0 0 1-1.33-.36v-1.1zM49 30.5a3.45 3.45 0 0 0 .57.24 2.23 2.23 0 0 0 .71.13 1.18 1.18 0 0 0 .59-.14.52.52 0 0 0 .27-.47c0-.34-.24-.49-.56-.61l-.52-.18a1.55 1.55 0 0 1-.93-.65 1.28 1.28 0 0 1-.16-.7 1.43 1.43 0 0 1 .54-1.19 2 2 0 0 1 1.25-.36 3.51 3.51 0 0 1 1.15.2v1.06h-.06a2 2 0 0 0-.89-.21 1.32 1.32 0 0 0-.57.11.39.39 0 0 0-.25.35c0 .25.24.37.56.49l.52.18a1.64 1.64 0 0 1 .92.73 1.5 1.5 0 0 1 .16.74 1.59 1.59 0 0 1-.61 1.32 2.26 2.26 0 0 1-1.38.42 2.47 2.47 0 0 1-1.31-.32v-1.1zm-1.85 1.39l-.12-.41a3 3 0 0 1-1.65.51 2 2 0 0 1-1.31-.44 1.81 1.81 0 0 1-.57-1.42v-3.46h1.17v3.12a1 1 0 0 0 .35.83 1.32 1.32 0 0 0 .82.25 2.21 2.21 0 0 0 1.16-.33v-3.87h1.17v5.23zM42.52 28a1.64 1.64 0 0 0-.88-.26 1.7 1.7 0 0 0-1 .38v3.81h-1.21v-5.26h1l.12.43a2 2 0 0 1 1.32-.53 3 3 0 0 1 .52 0 1.73 1.73 0 0 1 .51.16zM35 30.72a3.25 3.25 0 0 0 1 .15 1.22 1.22 0 0 0 1-.5 1.83 1.83 0 0 0 .33-1.09 1.89 1.89 0 0 0-.33-1.09 1.11 1.11 0 0 0-1-.49 2.06 2.06 0 0 0-1 .3zm-.18-6.12H35V27a2.16 2.16 0 0 1 1.32-.44 2 2 0 0 1 1.66.77 2.8 2.8 0 0 1 .54 1.73 3.24 3.24 0 0 1-.65 2.08 2.41 2.41 0 0 1-1.94.85 5.1 5.1 0 0 1-1.06-.13 6.24 6.24 0 0 1-1-.32V24.8zM11 7.58A6.77 6.77 0 0 1 16.49 5c6.23 0 7.93 4.91 7.93 8.3v10.25a3.83 3.83 0 0 0 2.81 3.61A16 16 0 0 0 15.86 0 16.59 16.59 0 0 0 5.41 3.87 6.5 6.5 0 0 1 11 7.58" /><path d="M20.76 23.55V12.98a4.47 4.47 0 0 0-4.46-4.25 4.55 4.55 0 0 0-4.52 4.11 4 4 0 0 0 0 .51v9.53a1.83 1.83 0 1 1-3.65 0V10.56c-.24-3.4-3.34-3.93-5-4A16 16 0 0 0 15.86 32a15.69 15.69 0 0 0 8.25-2.33c-3.21-2-3.35-6.12-3.35-6.12" /></svg>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</nav>
				</div>
			</footer>
		);
	}
}
