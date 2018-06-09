import React from 'react';

import Header from './Header';
import PeoplesList from './peoples/PeoplesList';
import MemberPaidsList from './memberPaids/MemberPaidsList';

export default () => {
  return (
    <div>
      <Header />
      {
        false ? <PeoplesList />
        :<MemberPaidsList />
      }
    </div>
  );
};
