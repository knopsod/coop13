import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Header from '../Header';

import { Peoples } from '../../../imports/collections/peoples';

class PeopleEditor extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push("/");
  }
  handleCancel(e) {
    e.preventDefault();
    this.props.history.push("/");
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <h2>Peple info.</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <label>No. :</label>
              <input type="text" className="form-control" ref="no"/>
            </div>
            <div className="form-group">
              <label>Full name :</label>
              <input type="text" className="form-control" ref="fullName"/>
            </div>
            <div className="form-group">
              <button type="button" className="btn btn-default"
                onClick={this.handleCancel.bind(this)}>Cancel</button>
              <span className="pull-right">
                <button type="submit" className="btn btn-primary">Submit</button>
              </span>
            </div>
          </form>
        </div>

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
