/*----------------------------------------*\
  bitRepublic - targets.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-16 00:25:32
  @Last Modified time: 2018-02-14 23:22:45
\*----------------------------------------*/
import { Mongo } from 'meteor/mongo';

import './publications.js';
import './methods.js';
import './startup.js';

export const Targets = new Mongo.Collection('targets');
