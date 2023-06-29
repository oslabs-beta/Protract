import React from 'react';
describe('login functionality', () => {
  it('allows a user to login and logout', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Login').should('be.visible').click();
    cy.get('#loginModal').within(() => {
      cy.get('input[name="username"]').type('hulk');
      cy.get('input[name="password"]').click().type('1234');
      cy.get('button').first().click();
    })
    cy.contains('hulk').should('be.visible');

    cy.contains('Projects').click();
    cy.get('#loadModal').within(() => {
      cy.contains('Protract Blueprint').click();
      cy.contains('Load').click();
    })
    cy.contains('div').trigger('mousedown', {button: 0}).trigger('mousemove', {clientX: 500, clientY: 300}).trigger('mouseup')
    cy.contains('ol').trigger('mousedown', {button: 0}).trigger('mousemove', {clientX: 500, clientY: 300}).trigger('mouseup')
    cy.contains('img').trigger('mousedown', {button: 0}).trigger('mousemove', {clientX: 500, clientY: 300}).trigger('mouseup')
    cy.get('[placeholder="Component Name"]').click().type('Cypress is so amazing{enter}')
    
    cy.get('[aria-label="elements"]').within(() => {
      cy.contains('amazing').within(() => {
        cy.contains('X').click()
      })
    })
      cy.contains('Yes').click()
      cy.get('[aria-label="elements"]').within(() => {
      cy.contains('img').trigger('mousedown', {button: 0}).trigger('mousemove', {clientX: 500, clientY: 200}).trigger('mouseup')
      cy.contains('div').within(() => {
        cy.contains('X').click()
      })
    })
        cy.contains('Yes').click()
      cy.get('[aria-label="elements"]').within(() => {
        cy.contains('img').within(() => {
          cy.contains('X').click()
        })
      })
        cy.contains('Yes').click()
      cy.get('[aria-label="elements"]').within(() => {
        cy.contains('ol').within(() => {
          cy.contains('X').click()
        })
      })
        cy.contains('Yes').click()

    cy.contains('Save').click();
    cy.contains('New').click();
    cy.contains('Yes').click();
    cy.contains('Save').click();
    cy.get('#saveModal').within(() => {
      cy.get('input').click().type('Super Cool Awesome Project also my WPM is so crazy fast holy moly');
      cy.contains('Save').click();
    })
    cy.contains('Projects').click();
    cy.get('#loadModal').within(() => {
      cy.contains('also').click();
      cy.contains('Delete').click();
    })

    cy.contains('Logout').click();

    cy.contains('Login').should('be.visible');
  })
})