import { Meteor } from 'meteor/meteor';

import { Peoples } from '../imports/collections/peoples';

Meteor.startup(() => {
  Meteor.publish('peoples', function () {
    return Peoples.find({
      $or: [
        { createdId: this.userId },
        { sharedWith: this.userId }
      ]
    });
  });
});
