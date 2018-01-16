import { Mongo } from 'meteor/mongo';

import './publications.js';
import './restAPI.js';
import './methods.js';

export const Targets = new Mongo.Collection('targets');
