describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    cy.request('POST', 'http://localhost:3001/api/users/', {
      "blogs": [],
      "username": "root",
      "name": "root",
      "password": "123456"
    })

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('blogs')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
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

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()

      cy.contains('new blog')
      cy.contains('root logged in')

    })


  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: '123456' })
    })

    it('A blog can be created', function () {
      const obj = {
        "title": "@this is something",
        "author": "root",
        "url": "https://goosssgleedsed.com",
        "likes": "332"
      };
      cy.createBlog(obj)
      cy.contains('@this is something')
      cy.get('.blog').should('have.length', 1)
    })

    it('like a blog', function () {
      const obj = {
        "title": "@this is something",
        "author": "root",
        "url": "https://goosssgleedsed.com",
        "likes": "332"
      };
      cy.createBlog(obj)

      cy.contains('view').click()
      cy.get('.like-numbers').should('have.text', '0')

      cy.contains('like').click()
      cy.get('.like-numbers').should('have.text', '1')
    })

    it('A blog can be removed by user that is creator', function () {
      const obj = {
        "title": "@this is something",
        "author": "root",
        "url": "https://goosssgleedsed.com",
        "likes": "332"
      };
      cy.createBlog(obj)

      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('.blog').should('have.length', 0)

    })
    it('A blog can not be removed by other users', function () {
      const obj = {
        "title": "@this is something",
        "author": "root",
        "url": "https://goosssgleedsed.com",
        "likes": "332"
      };
      cy.createBlog(obj)
      cy.contains('logout').click()
      cy.request('POST', 'http://localhost:3001/api/users/', {
        "blogs": [],
        "username": "moot",
        "name": "moot",
        "password": "123456"
      })
      cy.login({ username: 'moot', password: '123456' })
      cy.contains('view').click()
      cy.get('#removeButton').should('have.length', 0)



    })
  })
})
