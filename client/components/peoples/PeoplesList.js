import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import FlipMove from 'react-flip-move';

import { Peoples } from '../../../imports/collections/peoples';

import Header from '../Header';

class PeoplesList extends Component {
  handleClick(e) {
    e.preventDefault();

    Meteor.call('peoples.insert');
  }

  handleRemoveClick(people) {
    this.props.meteorCall('peoples.hide', people);
  }

  renderList() {
    return this.props.peoples.map((people) => {
      return (
        <li className="list-group-item" key={people._id}>
          {this.props.userId &&
            <Link className="btn btn-info"
              to={`peoples/${people._id}`}>Edit</Link>
          }
          {` ${people.no}. ${people.fullName}`}
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
        {this.props.userId &&
          <ul className="list-group">
            <li className="list-group-item">
              <button className="btn btn-primary"
                onClick={this.handleClick.bind(this)}>
                Create
              </button>
            </li>

            <li className="list-group-item">
              <div className="input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                <input id="search" ref="search" type="text" className="form-control" name="search" placeholder="Search..."/>
              </div>
            </li>
            <FlipMove maintainContainerHeight={true}>
              {this.renderList()}
            </FlipMove>
          </ul>
        }

      </div>
    );
  }
}

export default withTracker((props) => {
  Meteor.subscribe('peoples');

  return {
    peoples: Peoples.find({}, {sort: {no: 1}}).fetch(),
    userId: Meteor.userId(),
    meteorCall: Meteor.call
  };
})(PeoplesList);
