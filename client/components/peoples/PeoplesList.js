import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import FlipMove from 'react-flip-move';
import PropTypes from 'prop-types';

import { Peoples } from '../../../imports/collections/peoples';

import Header from '../Header';
import PeopleInlineEditor from './PeopleInlineEditor';

class PeoplesList extends Component {
  constructor(props) {
    super(props);
  }

  handleCreateClick(e) {
    e.preventDefault();

    this.props.meteorCall('peoples.insert');
  }

  handleHideClick(people) {
    this.props.meteorCall('peoples.hide', people);
  }

  handleRemoveClick(people) {
    this.props.meteorCall('peoples.remove', people);
  }

  handleCopyClick(people) {
    this.props.meteorCall('peoples.duplicate', people);
  }

  renderList() {
    return this.props.peoples.map((people) => {
      return (
        <li className="list-group-item d-flex justify-content-between"
          key={people._id}>
          <Link className="btn btn-info"
            to={`peoples/${people._id}`}>Edit</Link>

          {` ${people.no}. ${people.fullName}`}

          <span className="pull-right">

            <PeopleInlineEditor key={people._id} people={people} />

            <button className="btn btn-warning" style={{marginLeft: 2}}
              onClick={() => {this.handleHideClick(people)}}>
              X
            </button>
          </span>

        </li>
      );
    });
  }

  renderHiddenList() {
    return this.props.hiddenPeoples.map((people) => {
      return (
        <li className="list-group-item d-flex justify-content-between"
          key={people._id}>

          <button className="btn btn-default"
            onClick={() => this.handleCopyClick(people)}>Copy</button>

          {` ${people.no}. ${people.fullName}`}

          <span className="pull-right">
            {`${people.amount}`}
            <button className="btn btn-danger" style={{marginLeft: 2}}
              onClick={() => {this.handleRemoveClick(people)}}>
              X
            </button>
          </span>

        </li>
      );
    });
  }

  render() {
    return (
      <div>
        {this.props.userId &&
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between">
              <button className="btn btn-primary" style={{marginRight: 2}}>
                Excel(กำลังทำ...)
              </button>
              { parseInt(this.props.peoples.length) < 34 ?
                <button className="btn btn-primary" style={{marginRight: 2}}>
                  พิมพ์ใบรายชื่อ(33)(กำลังทำ...)
                </button>
                : undefined
              }
              { parseInt(this.props.peoples.length) < 11 ?
                <button className="btn btn-primary" style={{marginRight: 2}}>
                  พิมพ์ใบปะหน้า(10)(กำลังทำ...)
                </button>
                : undefined
              }
            </li>

            <li className="list-group-item">
              <button className="btn btn-primary"
                onClick={this.handleCreateClick.bind(this)}>
                Create
              </button>
            </li>

            {/* <li className="list-group-item">
              <div className="input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                <input id="search" ref="search" type="text" className="form-control" name="search" placeholder="Search..."/>
              </div>
            </li> */}

            <FlipMove maintainContainerHeight={true}>
              {this.renderList()}

              <li className="list-group-item d-flex justify-content-between">
                <span className="pull-right">
                  <h4 style={{marginRight: 40}}>
                    {`รวม ${this.props.sum}`}
                  </h4>
                  {/* <input style={{marginRight: 40}} value={this.state.sum}/> */}
                </span>
              </li>

              {this.renderHiddenList()}
            </FlipMove>
          </ul>
        }

      </div>
    );
  }
}

PeoplesList.propTypes = {
  peoples: PropTypes.array,
  sum: PropTypes.string,
  hiddenPeoples: PropTypes.array,
  userId: PropTypes.string,
  meteorCall: PropTypes.func
}

export default withTracker((props) => {
  Meteor.subscribe('peoples');

  const peoples = Peoples.find({visibled: true}, {sort: {no: 1}}).fetch();
  const hiddenPeoples = Peoples.find({visibled: false}, {sort: {no: 1}}).fetch();
  let sum = 0;

  peoples.forEach((people) => {
    sum = sum + parseInt(people.amount);
  });

  sum = '' + sum;

  return {
    peoples,
    sum,
    hiddenPeoples,
    userId: Meteor.userId(),
    meteorCall: Meteor.call
  };
})(PeoplesList);
