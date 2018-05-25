import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

class PeopleInlineEditor extends Component {
  constructor(props) {
    super(props);

    const people = props.people;

    this.state = {
      people
    }
  }
  handleChange(e) {
    const amount = e.target.value;
    this.setState({
      people: { ...this.state.people, amount }
    });
  }
  handleBlur(e) {
    const { people } = this.state;
    this.props.meteorCall('peoples.update', people, (err, res) => {
      if (!err) {

      }
    });
  }
  render() {
    return (
      <input type="number" style={{textAlign: 'right'}}
        value={this.state.people.amount}
        onChange={this.handleChange.bind(this)}
        onBlur={this.handleBlur.bind(this)}/>
    );
  }
};

PeopleInlineEditor.propTypes = {
  people: PropTypes.object,
  meteorCall: PropTypes.func
}

export default withTracker((props) => {
  const people = props.people;
  return {
    people,
    meteorCall: Meteor.call
  }
})(PeopleInlineEditor);
