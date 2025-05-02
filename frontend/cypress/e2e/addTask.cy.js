describe('Add task in detailed view', () => {
    beforeEach(() => {
    // create a fabricated user from a fixture
    let uid // user id
    let name // name of the user (firstName + ' ' + lastName)
    let email // email of the user

    cy.fixture('user.json')
      .then((user) => {
        cy.request({
          method: 'POST',
          url: 'http://localhost:5000/users/create',
          form: true,
          body: user
        }).then((response) => {
          uid = response.body._id.$oid
          name = user.firstName + ' ' + user.lastName
          email = user.email
        })
      })
    
      cy.login(); // This will create the user and log them in
      const testTitle = "My first task"
      cy.get('input#title').type(testTitle);
      cy.get('input[type=submit]').click();
      cy.get('div.title-overlay').contains(testTitle).click();



    });
  
    it('button should be disabled when input field is empty', () => {
      // Visit the app

      // Make sure we are in detailed view
      cy.get('div.popup').should('exist');
  
      // Count todo list items
      cy.get('ul.todo-list').find('li').its('length').as('initialCount');
  
      cy.get('@initialCount').then(initialCount => {
        // Assert that input is empty
        cy.get('input[placeholder="Add a new todo item"]').should('be.empty');
  
        // Try clicking the add button (should be disabled or do nothing)
        cy.get('input[value="Add"]').click()
        
        // Count again and compare
        cy.get('ul.todo-list').find('li').its('length').then(postCount => {
          expect(postCount).to.eq(initialCount); // No tasks should be added
        });
      });
    });
  });