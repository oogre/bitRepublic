/*----------------------------------------*\
  bitRepublic - bots.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-26 23:09:20
  @Last Modified time: 2018-02-02 00:06:54
\*----------------------------------------*/
import { Mongo } from 'meteor/mongo';

import './publications.js';
import './restAPI.js';
import './methods.js';
import './startup.js';

export const Bots = new Mongo.Collection('bots');

export const Schedules = new Mongo.Collection('schedules');
