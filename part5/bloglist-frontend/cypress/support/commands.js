Cypress.Commands.add('login', ({ username, password }) => {
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()

  // cy.request('POST', 'http://localhost:3001/api/login', {
    // username, password
  // }).then(({ body }) => {
    // localStorage.setItem('loggedUser', JSON.stringify(body))
    // cy.visit('http://localhost:3000')
  // })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.contains('new blog').click()
  cy.get('#title').type(title)
  cy.get('#author').type(author)
  cy.get('#url').type(url)
  cy.get('#createBlog').click()

  // cy.request({
  //   method: 'POST',
  //   url: 'http://localhost:3001/api/blogs',
  //   body: { title, author, url, likes },
  //   headers: {
  //     'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
  //   }
  // }).then((res)=>{console.log(res)})
})