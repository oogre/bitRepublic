import { Mongo } from 'meteor/mongo';

import './publications.js';
import './restAPI.js';
import './methods.js';

export const Bots = new Mongo.Collection('bots');
