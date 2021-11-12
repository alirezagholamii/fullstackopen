describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('blogs')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.request('POST', 'http://localhost:3001/api/users/', {
        "blogs": [],
        "username": "root",
        "name": "root",
        "password": "123456"
      })
      cy.get('#username').type('root')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()

      cy.contains('new blog')
      cy.contains('root logged in')

    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('fakeUser')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()
      cy.contains('invalid username or password')

      cy.get('.error')
      .should('contain', 'invalid username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    })
  })
})
