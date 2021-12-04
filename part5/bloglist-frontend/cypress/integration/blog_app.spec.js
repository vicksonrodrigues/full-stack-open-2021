describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'SuperUser',
      username: 'roots',
      password: '123456789'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login from is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('Log in')
  })


  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Log in')
      cy.get('#username')
        .type('roots')
      cy.get('#password')
        .type('123456789')
      cy.get('#login-button')
        .click()
      cy.contains('SuperUser is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Log in')
      cy.get('#username')
        .type('roots')
      cy.get('#password')
        .type('256489721')
      cy.get('#login-button')
        .click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'SuperUser is logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username:'roots',password:'123456789' })
    })

    it('A blog can be created', function() {
      cy.contains('Create new Blog')
        .click()
      cy.get('#title')
        .type('First class tests')
      cy.get('#author')
        .type('Edsger W. Dijkstra')
      cy.get('#url')
        .type('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
      cy.get('#create-button').click()

      cy.contains('First class tests - Edsger W. Dijkstra')
    })

    describe('and several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'First class tests',
          author: 'Edsger W. Dijkstra',
          url:'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        })
        cy.createBlog({
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/'
        })
        cy.createBlog({
          title: 'TDD harms architecture',
          author: 'Robert C. Martin',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        })

      })

      it('A user can be like a blog', function() {
        cy.contains('First class tests - Edsger W. Dijkstra')
          .get('#view-button')
          .click()

        cy.get('#like-button')
          .click()

        cy.contains('likes:1')
      })

      it('A user can be delete a blog', function() {
        cy.contains('First class tests - Edsger W. Dijkstra')
          .get('#view-button')
          .click()

        cy.get('#delete-button')
          .click()

        cy.get('.success')
          .should('contain', 'First class tests was successfully deleted')
          .and('have.css', 'color', 'rgb(0, 128, 0)')

        cy.get('html').should('not.contain', 'First class tests - Edsger W. Dijkstra')
      })

      it('blogs are ordered according to likes with the blog with the most likes being first', function(){
        cy.contains('First class tests').parent().as('blog1')
        cy.contains('React patterns').parent().as('blog2')
        cy.contains('TDD harms architecture').parent().as('blog3')

        cy.get('@blog1').contains('view').click()
        cy.get('@blog2').contains('view').click()
        cy.get('@blog3').contains('view').click()
        cy.get('@blog1').contains('like').as('like1')
        cy.get('@blog2').contains('like').as('like2')
        cy.get('@blog3').contains('like').as('like3')

        cy.get('@like2').click()
        cy.wait(500)
        cy.get('@like1').click()
        cy.wait(500)
        cy.get('@like1').click()
        cy.wait(500)
        cy.get('@like3').click()
        cy.wait(500)
        cy.get('@like3').click()
        cy.wait(500)
        cy.get('@like3').click()
        cy.wait(500)

        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('likes:1')
          cy.wrap(blogs[1]).contains('likes:2')
          cy.wrap(blogs[2]).contains('likes:3')
        })

      })
    })

  })
})