import React from 'react'

describe('flowtree functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('contains only one node upon app start', () => {
    // click component tree tab
    cy.contains('Component Tree').click()
    // look inside component tree div / container, check for one single node called app
    cy.get('#flowTree').contains('app').should('be.visible')
  })

  it('adds a custom component that populates in the tree, clicking on the new node populates it in canvas', () => {
    // click on component tree tab
    cy.contains('Component Tree').click()
    // select custom component input field
    // enter custom component, either click add or press enter
    cy.get('[placeholder="Component Name"]').click().type('Comp1{enter}')
    // check if new node populated
    cy.get('#flowTree').within(() => {
      cy.contains('Comp1').should('be.visible')
      // click on new node
      cy.contains('Comp1').click()
    })
    // check if canvas updates to new node
    cy.get('#currCompTitle').contains('Comp1').should('be.visible')
  })

  it('deletes appropriate tree node when corresponding node is deleted on canvas', () => {
    cy.contains('Component Tree').click();
    cy.get('[placeholder="Component Name"]').click().type('Comp1{enter}')

    cy.get('#canvas').within(() => {
      cy.contains('Comp1').within(() => {
        cy.contains('X').click();
      })
    })
    cy.get('#deleteModal').contains('Yes').click();
    cy.get('#flowTree').should('not.contain', 'Comp1');

  })
})
