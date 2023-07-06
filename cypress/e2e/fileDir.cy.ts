import React from 'react';

describe('fileDir func', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('populates based on custom components made and not on draggables', () => {
    cy.get('[placeholder="Component Name"]').click().type('Cypress is so amazing{enter}')
    cy.contains('ol').trigger('mousedown', {button: 0}).trigger('mousemove', {clientX: 500, clientY: 300}).trigger('mouseup')
    cy.get('#fileDir').should('contain', 'Cypress is so amazing');
    cy.get('#fileDir').should('not.contain', 'ol');
  })

  it ('can enter the instance of a custom component', () => {
    cy.get('[placeholder="Component Name"]').click().type('I LOVE TESTING{enter}')
    cy.get('[placeholder="Component Name"]').click().type('I LOVE TESTING2{enter}')
    cy.get('[placeholder="Component Name"]').click().type('I LOVE TESTING3{enter}')
    cy.get('[placeholder="Component Name"]').click().type('I LOVE TESTING4{enter}')
    cy.get('#leftCol').within(() => {
      cy.contains('I LOVE TESTING4').click();
    })
    cy.get('h2').should('contain', 'I LOVE TESTING4');
  })
})