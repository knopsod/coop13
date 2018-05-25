import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import Header from '../Header';

import { Peoples } from '../../../imports/collections/peoples';

class PeopleEditor extends Component {
  constructor(props) {
    super(props);

    const { people } = this.props;

    this.state = { people };
  }
  handleSubmit(e) {
    e.preventDefault();
    const { people } = this.state;
    this.props.meteorCall('peoples.update', people, (err, res) => {
      if (!err) {
        this.props.history.push("/");
      }
    });
  }
  handleCancel(e) {
    e.preventDefault();
    this.props.history.push("/");
  }
  handleFullNameChange(e) {
    const fullName = e.target.value;

    this.setState({
      people: { ...this.state.people, fullName }
    });
  }
  handleNoChange(e) {
    const no = e.target.value;
    this.setState({
      people: { ...this.state.people, no }
    });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <h2>Edit people</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <button type="button" className="btn btn-primary" style={{marginRight: 2}}>
                พิมพ์ใบสมัคร
              </button>
              <button type="button" className="btn btn-primary" style={{marginRight: 2}}>
                พิมพ์ใบสัญญา
              </button>
            </div>
            <div className="form-group">
              <label>No. :</label>
              <input type="text" className="form-control" ref="no"
                value={this.state.people.no}
                onChange={this.handleNoChange.bind(this)}/>
            </div>
            <div className="form-group">
              <label>Full name :</label>
              <input type="text" className="form-control" ref="fullName"
                value={this.state.people.fullName}
                onChange={this.handleFullNameChange.bind(this)} />
            </div>
            <div className="form-group">
              <button type="button" className="btn"
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
};

PeopleEditor.propTypes = {
  people: PropTypes.object,
  meteorCall: PropTypes.func
}

export default withTracker((props) => {
  Meteor.subscribe('peoples');

  const _id = props.match.params._id;
  const people = Peoples.findOne(_id);

  return {
    people,
    meteorCall: Meteor.call
  }
})(PeopleEditor);
