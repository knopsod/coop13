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
  handleNumberBlur(e) {
    const num = e.target.value;
    const paids = this.state.memberPaid.paids;

    paids.push(parseInt(num));

    this.setState({
      memberPaid: { ...this.state.memberPaid, paids }
    });

    const { memberPaid } = this.state;
    this.props.meteorCall('memberPaids.update', memberPaid, (error, response) => {
      if (!error) {

      }
    });
  }
  renderJoinPaids() {
    if ( this.props.memberPaid.paids.length ) {
      return this.props.memberPaid.paids.join('+ ');
    } else {
      return '0';
    }
  }
  handleRemoveClick(e) {
    const paids = this.state.memberPaid.paids;

    if (paids.length > 1) {
      paids.pop();
    }

    this.setState({
      memberPaid: { ...this.state.memberPaid, paids }
    });

    const { memberPaid } = this.state;
    this.props.meteorCall('memberPaids.update', memberPaid, (error, response) => {
      if (!error) {

      }
    });
  }
  render() {
    return (
      <tr>
        <td>
          {`${this.state.memberPaid.no}. `}

        </td>
        <td>
          { !!this.props.userId ?
            <input type="text" className="form-control"
            placeholder="ชื่อ"
            value={this.state.memberPaid.name}
            onChange={this.handleNameChange.bind(this)}
            onBlur={this.handleBlur.bind(this)}/>
            :
            `${this.state.memberPaid.name}`
           }
        </td>
        <td>

          <input type="number" className="form-control"
            placeholder="จำนวน"
            onBlur={this.handleNumberBlur.bind(this)}/>
        </td>
        <td>
          {`${this.renderJoinPaids()} `}
          <button className="btn btn-danger glyphicon glyphicon-remove"
            onClick={this.handleRemoveClick.bind(this)}></button>

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
  const userId = Meteor.userId();

  return {
    memberPaid,
    meteorCall: Meteor.call,
    userId,
  };
})(MemberPaidsItem);
