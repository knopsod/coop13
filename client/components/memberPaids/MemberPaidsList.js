import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import { MemberPaids } from '../../../imports/collections/memberPaids';
import MemberPaidsItem from './MemberPaidsItem';

class MemberPaidsList extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      memberPaids: props.memberPaids
    }
  }
  handleClick(e) {
    e.preventDefault();
    this.props.meteorCall('memberPaids.insert');
  }
  renderItems() {
    return this.props.memberPaids.map( (memberPaid) => {
      return <MemberPaidsItem
        key={memberPaid._id} memberPaid={memberPaid}/>
    });
  }
  render() {
    return (
      <div className="container">
        <div>
          { !!this.props.userId ?
            <button className="btn btn-primary"
              onClick={this.handleClick.bind(this)}>เพิ่มสมาชิก</button>
            : undefined
          }

        </div>


        <hr/>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>ชื่อ</th>
              <th>จำนวน</th>
              <th>รวม {`${this.props.total}`} บาท</th>
            </tr>
          </thead>
          <tbody>
            { this.renderItems() }

          </tbody>
        </table>
      </div>
    );
  }
};

MemberPaidsList.propTypes = {
  memberPaids: PropTypes.array,
  meteorCall: PropTypes.func,
  userId: PropTypes.string,
  total: PropTypes.number
}

export default withTracker((props) => {
  Meteor.subscribe('MemberPaids');

  const memberPaids = MemberPaids.find({}, {sort: {no: 1}}).fetch();

  const userId = Meteor.userId();

  const getSum = (total, num) => {
    return total + num;
  }

  let total = 0;
  for(let i = 0; i < memberPaids.length; i++) {
    total += memberPaids[i].paids.reduce(getSum);
  }

  return {
    memberPaids,
    meteorCall: Meteor.call,
    userId,
    total
  }
})(MemberPaidsList);
