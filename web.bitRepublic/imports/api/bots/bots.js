import { Mongo } from 'meteor/mongo';

import './publications.js';
import './restAPI.js';
import './methods.js';
import './startup.js';

export const Bots = new Mongo.Collection('bots');

export const Schedules = new Mongo.Collection('schedules');
