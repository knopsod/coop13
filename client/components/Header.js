import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Accounts from './Accounts';

class Header extends Component {

  render() {
    return (
      <nav className="nav navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">กทบ.</Link>          
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
