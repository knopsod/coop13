import { Mongo } from 'meteor/mongo';
import { moment } from 'meteor/momentjs:moment';

export const Peoples = new Mongo.Collection('peoples');

Meteor.methods({
  'peoples.insert': function () {
    return Peoples.insert({
      no: 0,
      fullName: '',
      createdAt: moment().valueOf(),
      updatedAt: 0,
      hiddenAt: 0,
      shownAt: 0,
      createdId: this.userId,
      updatedId: '',
      hiddenId: '',
      shownId: '',
      visibled: 1,
      sharedWith: [this.userId]
    });
  },
  'peoples.remove': function (people) {
    return Peoples.remove(people);
  },
  'peoples.update': function (people) {
    return Peoples.update(people._id,
      {
        $set: {
          ...people,
          no: parseInt(people.no),
          updatedAt: moment().valueOf(),
          updatedId: this.userId
        }
      }
    );
  },
  'peoples.hide': function (people) {
    return Peoples.update(people._id,
      {
        $set: {
          ...people,
          hiddenAt: moment().valueOf(),
          hiddenId: this.userId,
          visibled: 0
        }
      }
    );
  },
  'peoples.show': function (people) {
    return Peoples.update(people._id,
      {
        $set: {
          ...people,
          shownAt: moment().valueOf(),
          shownId: this.userId,
          visibled: 1
        }
      }
    );
  }
});
