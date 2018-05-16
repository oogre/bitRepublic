/*----------------------------------------*\
  bitRepublic - Faq.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 21:22:03
  @Last Modified time: 2018-05-16 22:25:24
\*----------------------------------------*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { config } from '../startup/config.js';

import HeaderMenu from './menu/header.js';
import FooterMenu from './menu/footer.js';
import T from '../i18n/index.js';


// App component - represents the whole app
export default class WhoWeAre extends Component {
  constructor(props){
    super(props);

    this.data = [{
      hash : i18n.__("FAQ.A.hash"),
      title : i18n.__("FAQ.A.title"),
      content : i18n.__("FAQ.A.content"),
    },{
      hash : i18n.__("FAQ.B.hash"),
      title : i18n.__("FAQ.B.title"),
      content : i18n.__("FAQ.B.content"),
    },{
      hash : i18n.__("FAQ.C.hash"),
      title : i18n.__("FAQ.C.title"),
      content : i18n.__("FAQ.C.content"),
    },{
      hash : i18n.__("FAQ.D.hash"),
      title : i18n.__("FAQ.D.title"),
      content : i18n.__("FAQ.D.content"),
    },{
      hash : i18n.__("FAQ.E.hash"),
      title : i18n.__("FAQ.E.title"),
      content : i18n.__("FAQ.E.content"),
    },{
      hash : i18n.__("FAQ.F.hash"),
      title : i18n.__("FAQ.F.title"),
      content : i18n.__("FAQ.F.content"),
    },{
      hash : i18n.__("FAQ.G.hash"),
      title : i18n.__("FAQ.G.title"),
      content : i18n.__("FAQ.G.content"),
    }];

    let select = 0;

    this.state = {
      selected : select >= this.data.length ? false : select
    }
  }

  handleClickOnLink(k, event){
    event.preventDefault();

    this.setState({
      selected : k
    });
  }

  render() {
    return (
      <div className="page">
        <HeaderMenu />
        <div className="page__content">
          <div className="container">
            <div className="tabs--profile tabs--faq">
              <ul className="tabs-selector-list">
                <li className="tabs-selector-list__item">
                  <a className="selected tabs-selector-list__button" href="#">Frequently Asked Questions</a>
                </li>
              </ul>
              <div className="tab">
                <div className="tab__content">
                  <div className="tab__content__wrapper">
                    <h5 className="title--quaternary">FAQ</h5>
                    <ul className="collapses-list">

                      {
                        this.data.map((d, k) => (
                          <li key={k} className={"collapse-list__item " + (this.state.selected === k ? 'open' : '')}>
                            <button
                              className={"collapse-list__item__button " + (this.state.selected === k ? 'open' : "")}
                              onClick={this.handleClickOnLink.bind(this, k)}
                            >
                              {d.title}
                            </button>
                            <div className="collapse-list__item__content">
                              <p dangerouslySetInnerHTML={ {__html: d.content} }></p>
                            </div>
                          </li>
                        ))
                      }

                      <li className="collapse-list__item">

                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterMenu />
      </div>
    );
  }
}
