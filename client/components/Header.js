import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Accounts from './Accounts';

class Header extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Ko-To-Bo</Link>
          </div>
          <ul className="nav navbar-nav">
            <li>
              <Accounts />
            </li>

          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
