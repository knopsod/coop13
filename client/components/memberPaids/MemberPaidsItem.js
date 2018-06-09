import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import numeral from 'numeral';

class MemberPaidsItem extends Component {
  constructor( props ) {
    super( props );

    const memberPaid = props.memberPaid;

    this.state = {
      memberPaid
    }
  }
  handleBlur(e) {
    const { memberPaid } = this.state;
    this.props.meteorCall('memberPaids.update', memberPaid, (error, response) => {
      if (!error) {

      }
    });
  }
  handleNameChange(e) {
    const name = e.target.value;
    this.setState({
      memberPaid: { ...this.state.memberPaid, name }
    });
  }
  render() {
    return (
      <tr>
        <td>
          {`${this.state.memberPaid.no}. `}

        </td>
        <td>
          <input type="text" className="form-control"
          placeholder="ชื่อ"
          onChange={this.handleNameChange.bind(this)}
          onBlur={this.handleBlur.bind(this)}/>
        </td>
        <td>

          <input type="number" className="form-control"
            placeholder="จำนวน"/>
        </td>
        <td>
          {`Some text`}
          <a href="#">
            <span className="glyphicon glyphicon-remove btn-danger"></span>
          </a>
        </td>
      </tr>

    );
  }
}

MemberPaidsItem.propTypes = {
  memberPaid: PropTypes.object,
  meteorCall: PropTypes.func
}

export default withTracker((props) => {
  const memberPaid = props.memberPaid;

  return {
    memberPaid,
    meteorCall: Meteor.call
  };
})(MemberPaidsItem);
