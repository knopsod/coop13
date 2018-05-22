import { Mongo } from 'meteor/mongo';
import { moment } from 'meteor/momentjs:moment';

export const Peoples = new Mongo.Collection('peoples');

Meteor.methods({
  'peoples.insert': function () {
    return Peoples.insert({
      no: 0,
      fullName: '',
      createdAt: moment().valueOf(),
      updatedAt: null,
      hiddenAt: null,
      creatorId: this.userId,
      updaterId: null,
      hiddenId: null
    });
  },
  'peoples.remove': function (people) {
    return Peoples.remove(people);
  },
  'peoples.update': function (people) {
    return Peoples.update(people._id,
      {
        ...people,
        updatedAt: moment().valueOf(),
        updaterId: this.userId
      }
    );
  },
  'peoples.hide': function (people) {
    return Peoples.update(people._id,
      {
        ...people,
        hiddenAt: moment().valueOf(),
        hiddenId: this.userId
      }
    );
  }
});
