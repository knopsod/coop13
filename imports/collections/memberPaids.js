import { Mongo } from 'meteor/mongo';
import { moment } from 'meteor/momentjs:moment';

export const MemberPaids = new Mongo.Collection('MemberPaids');

Meteor.methods({
  'memberPaids.insert': function () {
    const no = MemberPaids.find().count() + 1;

    return MemberPaids.insert({
      no,

      name: '',
      paids: [0],
    });
  },
  'memberPaids.remove': function (memberPaid) {
    return MemberPaids.remove(memberPaid._id);
  },
  'memberPaids.update': function (memberPaid) {
    return MemberPaids.update(memberPaid._id,
      {
        $set: {
          ...memberPaid,
          no: parseInt(memberPaid.no)
        }
      }
    );
  }
});
