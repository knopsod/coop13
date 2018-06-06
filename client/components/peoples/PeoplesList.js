import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import FlipMove from 'react-flip-move';
import PropTypes from 'prop-types';
import numeral from 'numeral';

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

  handleRemoveClick(people) {
    this.props.meteorCall('peoples.remove', people);
  }

  handleCopyClick(people) {
    this.props.meteorCall('peoples.duplicate', people);
  }

  renderList() {
    return this.props.peoples.map((people) => {
      return (
        <PeopleInlineEditor key={people._id} people={people} />
      );
    });
  }

  renderHiddenList() {
    return this.props.hiddenPeoples.map((people) => {
      return (
        <div className="list-group-item d-flex justify-content-between"
          key={people._id}>

          <button className="btn btn-info"
            onClick={() => this.handleCopyClick(people)}>คัดลอก</button>

          {` ${people.no}. ${people.fullName}`}

          <span className="pull-right">
            {`${people.amount}`}
            <button className="btn btn-danger" style={{marginLeft: 2}}
              onClick={() => {this.handleRemoveClick(people)}}>
              ลบทิ้ง
            </button>
          </span>

        </div>
      );
    });
  }

  render() {
    return (
      <div className="container flex">
        {this.props.userId &&
          <div className="list-group">

            <div className="list-group-item">
              <button className="btn btn-primary"
                onClick={this.handleCreateClick.bind(this)}>
                สร้างใหม่
              </button>
            </div>

            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-1">ลำดับที่</div>
                <div className="col-sm-7">ชื่อ-นามสกุล</div>
                <div className="col-sm-1">วงเงินกู้</div>
              </div>
            </div>

            <FlipMove maintainContainerHeight={true}>
              {this.renderList()}

              <div className="list-group-item d-flex justify-content-between">
                <span className="pull-right">
                  <h4 style={{marginRight: 32}}>
                    {`รวม ${numeral(parseInt(this.props.sum)).format('0,0')} บาท`}
                  </h4>
                </span>
              </div>

              {this.renderHiddenList()}
            </FlipMove>
          </div>
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
