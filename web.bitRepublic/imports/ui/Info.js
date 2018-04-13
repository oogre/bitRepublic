/*----------------------------------------*\
  256x256x256 - Alert.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-03-21 17:21:07
  @Last Modified time: 2018-04-10 15:03:51
\*----------------------------------------*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Meteor } from 'meteor/meteor';

// https://reactcommunity.org/react-modal/
import ReactModal from 'react-modal';

//ReactModal.setAppElement('body');

export default class Info extends Component {
	constructor(props){
		super(props);
	}
	handleSuccess (event){
		event.preventDefault();
		this.props.open = false;
		if(_.isFunction(this.props.onSuccess)){
			this.props.onSuccess();
		}
		return false;
	}
	render() {
		const modalStyle = {
			overlay : {
				position          : 'fixed',
				top               : 0,
				left              : 0,
				right             : 0,
				bottom            : 0,
				backgroundColor   : 'rgba(40, 40, 40, 0.3)',
				zIndex            : 9999
			},
			content : {
				position                   : 'absolute',
				top                        : '50%',
				left                       : '50%',
				minWidth				   :  "300px",
				maxWidth				   :  "460px",
				width				   	   :  "50% ",
				right                      : 'auto',
				bottom                     : 'auto',
				marginRight           	   : '-50%',
				transform                  : 'translate(-50%, -50%)',
				border                     : '0',
				backgroundColor   		   : 'rgba(255, 255, 255, 1.0)',
				color                      : '#342e30',
				overflow                   : 'auto',
				WebkitOverflowScrolling    : 'touch',
				borderRadius               : '0',
				outline                    : 'none',
				padding                    : '20px'
			}
		}

		return (
			<div className="container">
				<ReactModal
					isOpen={this.props.open}
					style={modalStyle}
					onRequestClose={this.handleSuccess.bind(this)}
					className="modal--tiny"
				>
					<div className="modal__header">
						<svg width="7" height="31" viewBox="0 0 7 31" xmlns="http://www.w3.org/2000/svg"><title>icon-info</title><g fill="#F1F5F8" fillRule="evenodd"><path d="M0 0h7v7H0zM0 13h7v18H0z"/></g></svg>
						<a className="modal__close" href="#" onClick={this.handleSuccess.bind(this)}>&times;</a>
					</div>
					<div className="modal__wrapper">
						<div className="modal__container">
							<div className="fields-row">
								<p>{this.props.message}</p>
								<button
									onClick={this.handleSuccess.bind(this)}
									className="button--primary--fw">
									OK
								</button>
							</div>
						</div>
					</div>
				</ReactModal>
			</div>
		);
	}
}
