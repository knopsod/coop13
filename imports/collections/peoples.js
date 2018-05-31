import { Mongo } from 'meteor/mongo';
import { moment } from 'meteor/momentjs:moment';

export const Peoples = new Mongo.Collection('peoples');

Meteor.methods({
  'peoples.insert': function () {
    return Peoples.insert({
      no: 0,

      day: '',
      month: '',
      year: '',

      fullName: '',
      prefixName: '',
      firstName: '',
      lastName: '',

      addressNo: '',
      addressBan: '',
      addressMoo: '',
      addressTambon: '',
      addressAmphoe: '',
      addressProvince: '',
      zipcode: '',
      phoneNumber: '',

      amount: 0,

      committeeName: '',
      committeeName2: '',

      copiedDocsCount: 0,

      funeralName: '',
      funeralTambon: '',
      funeralAmphoe: '',
      funeralProvince: '',

      spouseFullName: '',

      guarantorFullName: '',
      guarantorFullName2: '',

      witnessFullName: '',
      witnessFullName2: '',

      createdAt: moment().valueOf(),
      updatedAt: 0,
      hiddenAt: 0,
      shownAt: 0,
      createdId: this.userId,
      updatedId: '',
      hiddenId: '',
      shownId: '',
      visibled: true,
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
          visibled: false
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
          visibled: true
        }
      }
    );
  },
  'peoples.duplicate': function (people) {
    const {no, fullName, amount} = people;

    return Peoples.insert({
      no,
      fullName,
      amount,
      createdAt: moment().valueOf(),
      updatedAt: 0,
      hiddenAt: 0,
      shownAt: 0,
      createdId: this.userId,
      updatedId: '',
      hiddenId: '',
      shownId: '',
      visibled: true,
      sharedWith: [this.userId]
    });
  }
});
