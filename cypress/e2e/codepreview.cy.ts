describe('Code preview functionality', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('canvas item populates code preview', () => {
        cy.contains('img').trigger('mousedown', { button: 0 }).trigger('mousemove', { clientX: 500, clientY: 300 }).trigger('mouseup')
        cy.get('#codePreview').within(() => {
            cy.contains('<img></img>').should('be.visible')
        })
    })
    it('deleting item from canvas should remove from code preview', () => {
        cy.contains('form').trigger('mousedown', { button: 0 }).trigger('mousemove', { clientX: 500, clientY: 300 }).trigger('mouseup')
        cy.get('#codePreview').within(() => {
            cy.contains('<form></form>').should('be.visible')
        })
        cy.contains('X').click()
        cy.contains('Yes').click()
        cy.get('#codePreview').within(() => {
            cy.contains('<form></form>').should('not.exist')
        })
    })
})

export {}