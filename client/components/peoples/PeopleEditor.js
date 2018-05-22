import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Header from '../Header';

import { Peoples } from '../../../imports/collections/peoples';

class PeopleEditor extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label ref="fullName">Full name:</label>
            <input type="text" className="form-control" ref="fullName"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default withTracker((props) => {
  Meteor.subscribe('peoples');

  const _id = props.match.params._id;
  const people = Peoples.findOne(_id);

  return {
    fullName: 'Haha'
  }
})(PeopleEditor);
