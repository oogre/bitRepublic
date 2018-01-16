import { Mongo } from 'meteor/mongo';

import './publications.js';
import './restAPI.js';
import './methods.js';

export const Wallets = new Mongo.Collection('wallets');
