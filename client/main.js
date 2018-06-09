import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './components/App';
// import PeoplesList from './components/peoples/PeoplesList';
import PeopleEditor from './components/peoples/PeopleEditor';

import { Peoples } from '../imports/collections/peoples';
import { MemberPaids } from '../imports/collections/memberPaids';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/peoples/:_id" component={PeopleEditor} />
    </Switch>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(<Routes />, document.querySelector('.render-target'));
});
