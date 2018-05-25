import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import FlipMove from 'react-flip-move';

import { Peoples } from '../../../imports/collections/peoples';

import Header from '../Header';
import PeopleInlineEditor from './PeopleInlineEditor';

class PeoplesList extends Component {
  handleCreateClick(e) {
    e.preventDefault();

    Meteor.call('peoples.insert');
  }

  handleHideClick(people) {
    this.props.meteorCall('peoples.hide', people);
  }

  handleShowClick(people) {
    this.props.meteorCall('peoples.show', people);
  }

  renderList() {
    return this.props.peoples.map((people) => {
      return (
        <li className="list-group-item d-flex justify-content-between"
          key={people._id}>
          { people.visibled ?
            <Link className="btn btn-info"
              to={`peoples/${people._id}`}>Edit</Link>
              :
            <button className="btn btn-default">Info</button>
          }

          <PeopleInlineEditor key={people._id} people={people} />

          { people.visibled ?
            <span className="pull-right">
              <button className="btn btn-danger"
                onClick={() => {this.handleHideClick(people)}}>
                X
              </button>
            </span>
            :
            <span className="pull-right">
              <button className="btn btn-success"
                onClick={() => {this.handleShowClick(people)}}>
                U
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
                onClick={this.handleCreateClick.bind(this)}>
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
    peoples: Peoples.find({}, {sort: {visibled: -1, no: 1}}).fetch(),
    userId: Meteor.userId(),
    meteorCall: Meteor.call
  };
})(PeoplesList);
