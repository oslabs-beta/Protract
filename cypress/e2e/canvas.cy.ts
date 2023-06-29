describe('canvas functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('can have items dragged in and deleted', () => {
    cy.contains('div').trigger('mousedown', {button: 0}).trigger('mousemove', {clientX: 500, clientY: 300}).trigger('mouseup')
    cy.get('[aria-label="elements"]').within(() => {
      cy.contains('div').within(() => {
        cy.contains('X').click()
      })
    })
    cy.contains('Yes').click()
    cy.get('[aria-label="elements"]').should('not.have.descendants', 'button')
  })

  it('can add custom components', () => {
    cy.get('[placeholder="Component Name"]').click().type('Cypress is so amazing{enter}')
    cy.get('[aria-label="elements"]').should('have.descendants', 'button').contains('Cypress is so amazing')
  })

  //TODO : make sorting order test work. some issue at  line 28-30
  // it('can handle components changing order', () => {
  //   cy.contains('div').trigger('mousedown', {button: 0}).trigger('mousemove', {clientX: 500, clientY: 300}).trigger('mouseup')
  //   cy.wait(500)
  //   cy.contains('form').trigger('mousedown', {button: 0}).trigger('mousemove', {clientX: 500, clientY: 300}).trigger('mouseup')
  //   cy.wait(500)
  //   cy.get('[aria-label="elements"]').within(() => {
  //     cy.contains('form').trigger('mousedown', {button: 0}).trigger('mousemove', {clientX: 550, clientY: 300}).wait(1000).trigger('mouseup');
  //   })
  // }) 
})