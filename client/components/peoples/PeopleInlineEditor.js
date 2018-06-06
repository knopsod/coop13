import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  handleHideClick(people) {
    this.props.meteorCall('peoples.hide', people);
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
    // https://www.w3schools.com/bootstrap/bootstrap_forms_inputs2.asp
    const style = {marginTop: 5, marginBottom: 5};
    return (
      <div style={style}>
        <form className="form-inline">

          <div className="col-sm-1">
            <Link className="btn btn-info"
              to={`peoples/${this.state.people._id}`}>แก้ไข</Link>
          </div>

          <div className="form-group col-sm-1">
            <input className="form-control" type="number"
              style={{width: 64}}
              value={this.state.people.no}/>
          </div>

          <div className="form-group col-sm-7">
            <input className="form-control" type="text"
              id="fullName" name="fullName"
              value={this.state.people.fullName}/>
          </div>

          <div className="form-group">
            <input className="form-control" type="number"
              style={{textAlign: 'right'}}
              value={this.state.people.amount}
              onChange={this.handleChange.bind(this)}
              onBlur={this.handleBlur.bind(this)}/>

          </div>

          <div className="form-group pull-right">
            <button className="btn btn-warning" type="button"
              onClick={() => {this.handleHideClick(this.state.people)}}>
              ยกเลิก
            </button>
          </div>


        </form>
      </div>
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
