/*----------------------------------------*\
  bitRepublic - targets.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-16 00:25:32
  @Last Modified time: 2018-02-02 00:06:17
\*----------------------------------------*/
import { Mongo } from 'meteor/mongo';

import './publications.js';
import './restAPI.js';
import './methods.js';

export const Targets = new Mongo.Collection('targets');
