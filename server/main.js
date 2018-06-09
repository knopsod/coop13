import { Meteor } from 'meteor/meteor';

import { Peoples } from '../imports/collections/peoples';
import { MemberPaids } from '../imports/collections/memberPaids';

Meteor.startup(() => {
  Meteor.publish('peoples', function () {
    return Peoples.find({
      $or: [
        { createdId: this.userId },
        { sharedWith: this.userId }
      ]
    });
  });
  Meteor.publish('MemberPaids', function () {
    return MemberPaids.find({});
  });
});
