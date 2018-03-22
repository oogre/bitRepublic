/*----------------------------------------*\
  bitRepublic - footer.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-25 18:10:49
  @Last Modified time: 2018-03-21 20:29:49
\*----------------------------------------*/
import React, { Component } from 'react';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  EmailShareButton,
} from 'react-share';
import {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,
} from 'react-share';
import {
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  GooglePlusIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  RedditIcon,
  TumblrIcon,
  LivejournalIcon,
  MailruIcon,
  EmailIcon,
} from 'react-share';

// App component - represents the whole app
export default class FooterMenu extends Component {
	constructor(props){
		super(props);
	}

	render() {
			return (
			<footer className="main-footer">
				<div className="container">
					<nav>
						<div className="grid">
							<div className="column-3">
								<a className="menu--footer__title" href={FlowRouter.path("contact")}>Contact</a>
								<ul className="menu menu--footer">
									<li className="menu__item">
										<a className="menu__item__link" href="mailto:info@larbitslab.be">info@larbitslab.be</a>
									</li>
								</ul>
							</div>
							<div className="column-3">
								<p className="menu--footer__title">Supported By</p>
								<ul className="menu menu--footer">
									<li className="menu__item">
										<a className="menu__item__link">Flemish community</a>
									</li>
									<li className="menu__item">
										<a className="menu__item__link">XXXXXXXXXXXXXX</a>
									</li>
								</ul>
							</div>
							<div className="column-3">
								<p className="menu--footer__title">Partners</p>
								<ul className="menu menu--footer">
									<li className="menu__item">
										<a className="menu__item__link" href="mailto:info@larbitslab.be">XXXXXXXXXXXXXX</a>
									</li>
								</ul>
							</div>
						</div>
					</nav>
					<a target="_blank" href={"https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(location.href)}>
						<FacebookIcon size={32} round={true} />
					</a>

					<a target="_blank" href={"https://www.tumblr.com/widgets/share/tool?canonicalUrl="+encodeURIComponent(location.href)}>
						<TwitterIcon size={32} round={true} />
					</a>
					<p className="">Licensed under Creative Commons</p>
				</div>
			</footer>
		);
	}
}
