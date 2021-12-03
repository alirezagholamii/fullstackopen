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
      cy.get('.like-number').should('have.text', '0')

      cy.contains('like').click()
      cy.get('.like-number').should('have.text', '1')
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

  describe('Blogs List', function () {
    it('Blogs sorted by likes number', function () {
      // it.only('Blogs sorted by likes number', function () {
      cy.loginRequest({ username: 'root', password: '123456' })
      let posts = [{
        "title": "post that have 101 likes",
        "author": "root",
        "url": "https://goosssgleedsed.com",
        "likes": "101"
      },
      {
        "title": "@@ ddpost that have 41 likes",
        "author": "root",
        "url": "https://goosssgleedsed.com",
        "likes": "41"
      },
      {
        "title": "+!+!+ ddpost that have 2 likes",
        "author": "root",
        "url": "https://goosssgleedsed.com",
        "likes": "2"
      },
      {
        "title": "+!500+!+ ddpost that have 500 likes",
        "author": "root",
        "url": "https://goosssgleedsed.com",
        "likes": "500"
      }
      ]
      for (const post of posts) {
        cy.createBlogRequest(post)
      }
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'root', password: '123456'
      }).then(({ body }) => {
        localStorage.setItem('loggedUser', JSON.stringify(body))

        cy.request({
          method: 'GET',
          url: 'http://localhost:3001/api/blogs',
          headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
          }
        }).then((res) => {
          const result = res.body;
          result.sort((a, b) => b.likes - a.likes)
          cy.login({ username: 'root', password: '123456' })
          cy.get('.blog').should('have.length', 4)
          cy.get('.blog').then((blogs) => {
            cy.get('.show').click({ multiple: true })
            cy.get('.like-number').then((likes) => {
              likes.map((index, item) => {
                expect(likes[index].innerText).to.contain(result[index].likes)
              })
            })
          })
        })
      })
    })
  })
})
