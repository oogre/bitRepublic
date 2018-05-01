/*----------------------------------------*\
  bitRepublic - WhoWeAre.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 21:22:03
  @Last Modified time: 2018-04-18 12:28:10
\*----------------------------------------*/
import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { config } from '../startup/config.js';

import HeaderMenu from './menu/header.js';
import FooterMenu from './menu/footer.js';

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
                      <p>We are a Brussel-based artist duo LarbitsSisters who work at the intersection of art, technology and social systems. Our collaboration grew out of a shared fascination on new media, merging research and artistic practice onto projects in which concepts such as traceability, data processing, network analysis, algorithms, automation and interaction are explored. Central is the friction between public and private, online and offline; between the unbridled faith in technological progress and everyday life. Strategies and practices of new media are above all materials and tools of investigation and creation, allowing works to be developed that questions critical issues of today’s society.</p>
                      <p>In 2011 we founded the Research Lab on Digital Visualization, Larbitslab. Larbitslab brings together artists, designers, coders and scientists around issue of networked societies. The specificity of Larbitslab lies in the methodological approach, which combines closely observing practices, media analysis and research on the technical and societal implications.</p>
                      <p>The Bitsoiltax campaign grows out of shared ideas on growth and wealth in the data economy, on social justice and tax abuse, on tackling net giants on tax evasion. The bitsoil tax is thought of as a hacktivist act. For this project we worked essentially with programmers. Special thanks to Claire Tolan, Vincent Evrard, Arnaud Crucifix, Fleur Wirtz and the Peng! collective.</p>
                      <p>At the core, this bitsoiltax campaign claims a new vision of redistribution of internet wealth.  The bitsoiltax is a micro tax on data, the new oil of the data economy or bitsoil as we coined it. The bitsoiltax is a tax for the people, a tax for the 99%, a tax to fight inequality and to restore a fair balance in the data economy. You can participate by generate your own tax collector bot or bands of tax bots.</p>
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
