/*----------------------------------------*\
  bitRepublic - main.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-01-30 00:00:33
  @Last Modified time: 2018-02-02 00:10:20
\*----------------------------------------*/

import { Meteor } from 'meteor/meteor';
import '../imports/startup/account-config.js';
import '../imports/api/restAPI.js';
import '../imports/api/bitsoils/bitsoils.js';
import '../imports/api/bots/bots.js';
import '../imports/api/targets/targets.js';
import '../imports/api/wallets/wallets.js';
import '../imports/api/users/users.js';
import '../imports/api/actions/actions.js';
import '../imports/api/images/images.js';


Meteor.startup(() => {
  // code to run on server at startup
});
