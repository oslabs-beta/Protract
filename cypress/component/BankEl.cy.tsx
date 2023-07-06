import React from 'react';
import BankEl from '../../src/client/components/BankEl';

describe('<BankEl />', () => {
  it('renders', () => {
    cy.mount(<BankEl key="test1" id="test1" />);
  });
});
