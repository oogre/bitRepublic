/*----------------------------------------*\
  larbitsSisters - data.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-04-11 18:45:04
  @Last Modified time: 2018-04-11 18:57:39
\*----------------------------------------*/
import { Mongo } from 'meteor/mongo';

import './publications.js';
import './methods.js';
import './startup.js';

export const Data = new Mongo.Collection('data');


