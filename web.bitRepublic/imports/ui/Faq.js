/*----------------------------------------*\
  bitRepublic - Faq.js
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

    this.data = [{
      hash : "what",
      title : "question-1",
      content : "Answer to the question : text text text text text text text text text texttext text text text texttext text text text texttext text text text text",
    },{
      hash : "question-2",
      title : "Question 2",
      content : "Answer to the question : text text text text text text text text text texttext text text text texttext text text text texttext text text text text",
    },{
      hash : "question-3",
      title : "Question 3",
      content : "Answer to the question : text text text text text text text text text texttext text text text texttext text text text texttext text text text text",
    },{
      hash : "question-4",
      title : "Question 4",
      content : "Answer to the question : text text text text text text text text text texttext text text text texttext text text text texttext text text text text",
    },{
      hash : "question-5",
      title : "Question 5",
      content : "Answer to the question : text text text text text text text text text texttext text text text texttext text text text texttext text text text text",
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
            <div className="tabs--profile">
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
                              <p>{d.content}</p>
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
