import React, { Component } from 'react';

import Accounts from './Accounts';

class Header extends Component {

  render() {
    return (
      <nav className="nav navbar-default">
        <div className="navbar-header">
          <a className="navbar-brand">กทบ.</a>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Accounts />
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
