import React, { Component } from 'react';

import Header from '../Header';

class PeopleEditor extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label ref="fullName">Full name:</label>
            <input type="text" className="form-control" ref="fullName"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default PeopleEditor;
