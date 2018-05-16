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
      title : "Who is the campaign for?",
      content : "The campaign is open to all. To anonymous users, the anonymous mass producing personal data, to the 99%, to refugees, to those who are applying for asylum, to migrants and to NGO’s. It’s a campaign with a double purpose. On the one hand it aims to create awareness of the uneven distribution of the new resource bitsoil and the disequilibrium to be restored, considering the fact that it currently is concentrated in the hands of internet giants. On the other hand it offers a new vision of wealth redistribution in a digital society. It is a campaign to awaken the slumbering positive forces of civil society, participants, NGO’s, founders, organizers and theorists.",
    },{
      hash : "question-2",
      title : "What do the bots on Twitter?",
      content : "The bots on Twitter have been designed to carry out multiple tasks. There are several types of bots, prospector bots, propaganda bots, and the tax-claim bots. <br /><br /> The prospector bots are trained to patrol Twitter and to prospect user accounts for keywords or actions related to the issue of the campaign. IBM’s Watson Natural Language Classifier has been used to train the bots to spot sets of preselected words. <br /><br /> The propaganda bots have been designed to provide pop-ups-tweets with an informative propaganda video on the campaign on accounts that were spotted by prospector bots. The user is then guided to the campaign’s website. There he is asked to join and to generate his own bot or group of bots that will be trolling tech companies with tax claims. <br /><br /> All bots are equipped with a preprogrammed tax calculation mechanism and are able to count the (fictional) amount of tax represented by online actions related to the campaign. Through this mechanism the bots are capable of redistributing this added value across the participants of the campaign.",
    },{
      hash : "question-3",
      title : "What about the bots I generated?",
      content : "When you have created a bot, the task you asked him to perform will be carried out in the time or according to the frequency indicated. You can follow your bot’s actions at every instant, through your Personal Account Manager. This interface allows you to follow the actions performed by your bots and the value of bitsoil generated during this process. <br /><br /> And what will happen when I assign a task to my bot, for example sending a digital postcard to my friends? <br /><br /> When you have assigned your bot the task of sending a digital postcard to your friends, your friends will receive this postcard from an anonymous friend, from a dear friend who cares about the value of your data and who strives for a fairer economy. <br /><br /> The digital postcard that your bot will have sent to your friends will not be traceable to you. By making use of the TOR network your privacy is protected, and it also stresses the presence of the anonymous mass. It’s a campaign for and of the mass of anonymous internet users.",
    },{
      hash : "question-4",
      title : "Is it secure?",
      content : "The bots that you configure to tweet and/or send digital postcards are in no way related to your Twitter account or even your personal data. Moreover, the bots create their tweets via the Tor network, which means the IP addresses of our server and website are hidden. <br /><br /> And what happens when I publish a tweet with the share button? <br /><br /> When you publish a tweet on your account, we thank you warmly for your support and for passing on the word. And this action does not amount to more than an official announcement of support for the campaign.",
    },{
      hash : "question-5",
      title : "Do the bots really collect tax?",
      content : "The actions of tax collector-bots are limited to making tax claims to internet giants. Also, they alert prime ministers and point to the gains to be made with the proposed tax system. <br /><br /> How is the tax calculated? <br /><br /> Every action carried out by your bot generates data and bitsoil, the primary resource that is converted into the bitREPUBLIC’s virtual currency bitsoil. The amount of bitsoil is a translation of the number of bits and bytes involved in an online action. <br /><br /> Roughly, sending a tweet of 140 characters equals 200 bytes, equals 1 micro-bitsoil. By the same token all the micro-actions you carry out on the campaign’s website when you create your bot are converted into bitsoil on the basis of bits and bytes generated in the process. <br /><br /> What about the tax money? Will I really receive the tax-money collected by my bots and redistributed across participants? <br /><br /> No. What the bots actually do is only to claim a tax and to raise awareness about the gains to be made with the proposed tax system.",
    },{
      hash : "question-6",
      title : "I can’t find my beloved world leader I want to tweet to?",
      content : "Please send us an email: campaign@bitsoil.tax",
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
