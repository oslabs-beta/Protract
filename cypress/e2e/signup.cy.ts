describe('signup functionality', () => {
  it('can sign up a user', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Sign Up').click();
    // change username here when testing again
    cy.get('#signUpModal').within(() => {
      cy.get('input[name="username"]').type('newguy5')
      cy.get('input[name="email"]').click().type('new@guy.com')
      cy.get('input[name="password"]').click().type('newguy2')
      cy.get('button').first().click()
    })
    
    // match username to line 6 here
    cy.contains('newguy5').should('be.visible');
  })
})