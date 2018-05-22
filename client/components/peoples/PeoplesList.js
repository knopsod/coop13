import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Peoples } from '../../../imports/collections/peoples';

import Header from '../Header';

class PeoplesList extends Component {
  handleClick(e) {
    e.preventDefault();

    Meteor.call('peoples.insert');
  }

  handleRemoveClick(people) {
    Meteor.call('peoples.hide', people);
  }

  renderList() {
    return this.props.peoples.map((people) => {
      return (
        <li className="list-group-item" key={people._id}>
          {this.props.userId &&
            <Link className="btn btn-info"
              to={`peoples/${people._id}`}>Edit</Link>
          }
          {people.createdAt}|{people._id}
          {this.props.userId &&
            <span className="pull-right">
              <button className="btn btn-danger"
                onClick={() => {this.handleRemoveClick(people)}}>
                X
              </button>
            </span>
          }
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <ul className="list-group">
          {this.props.userId &&
            <li className="list-group-item">
              <button className="btn btn-primary"
                onClick={this.handleClick.bind(this)}>
                Create
              </button>
            </li>
          }
          {this.props.userId &&
            <li className="list-group-item">
              <div className="input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                <input id="search" ref="search" type="text" className="form-control" name="search" placeholder="Search..."/>
              </div>
            </li>
          }
          {this.renderList()}
        </ul>

      </div>
    );
  }
}

export default withTracker((props) => {
  Meteor.subscribe('peoples');

  return {
    peoples: Peoples.find({}, {sort: {createdAt: -1}}).fetch(),
    userId: Meteor.userId()
  };
})(PeoplesList);
