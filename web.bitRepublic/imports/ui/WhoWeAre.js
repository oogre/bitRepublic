/*----------------------------------------*\
  bitRepublic - WhoWeAre.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 21:22:03
  @Last Modified time: 2018-05-03 01:32:22
\*----------------------------------------*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { config } from '../startup/config.js';

import HeaderMenu from './menu/header.js';
import FooterMenu from './menu/footer.js';
import T from './../i18n/index.js';

// App component - represents the whole app
export default class WhoWeAre extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="page">
        <HeaderMenu />
        <div className="page__content">
          <div className="container">
            <div className="tabs--profile">
              <ul className="tabs-selector-list">
                <li className="tabs-selector-list__item">
                  <a className="selected tabs-selector-list__button" href="#">Who We Are</a>
                </li>
              </ul>
              <div className="tab">
                <div className="tab__content">
                  <div className="tab__content__wrapper">
                    <div className="whoweare">
                      <p><T>WhoWeAre.A</T></p>
                      <p><T>WhoWeAre.B</T></p>
                      <p><T>WhoWeAre.C</T></p>
                      <p><T>WhoWeAre.D</T></p>
                    </div>
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
