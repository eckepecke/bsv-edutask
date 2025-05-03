describe('Add task in detailed view', () => {
    // create a fabricated user from a fixture
    let uid // user id
    let name // name of the user (firstName + ' ' + lastName)
    let email // email of the user

    beforeEach(() => {
        cy.viewport(1280, 1000);
        cy.visit("http://localhost:3000");
      
        cy.fixture('user.json').then((user) => {
          return cy.request({
            method: 'POST',
            url: 'http://localhost:5000/users/create',
            form: true,
            body: user
          }).then((response) => {
            uid = response.body._id.$oid;
            name = user.firstName + ' ' + user.lastName;
            email = user.email;
      
            return cy.login().then(() => {
              const testTitle = "My first task";
              cy.get('input#title').type(testTitle);
              cy.get('input[type=submit]').click();
              cy.get('div.title-overlay').contains(testTitle).click();
              cy.log('beforeEach');
            });
          });
        });
      });
      

    afterEach(() => {
        cy.log('afterEach');
  
        if (uid) {
          cy.wrap(null).then(() => {
            return cy.request({
              method: 'DELETE',
              url: `http://localhost:5000/users/${uid}`
            }).then((response) => {
              expect(response.status).to.eq(200);
              cy.log(`Deleted test user ${uid}`);
            });
          });
        }
      });

      it('Clicking active task toggler should make the toggle button checked and the text have line-through', () => {
        cy.log('first it');

        // Find the to do item
        cy.get('ul.todo-list').find('li.todo-item').contains('Watch video')
        
        // First check that the task does not have line-through
        cy.get('li.todo-item').contains('Watch video')
        .parents('li.todo-item')
        .find('span.editable')
        .should('not.have.css', 'text-decoration', 'line-through')

        // First check that the toggler icon  has the unchecked class 
        cy.get('li.todo-item').contains('Watch video')
        .parents('li.todo-item')
        .find('span.checker')
        .should('have.class', 'unchecked');

        // Click the toggle icon
        cy.get('li.todo-item').contains('Watch video')
        .parents('li.todo-item')
        .find('span.checker')
        .click();
        
        // Check that the task is now marked as completed
        cy.get('li.todo-item').contains('Watch video')
        .parents('li.todo-item')
        .find('span.editable')
        .should('have.css', 'text-decoration', 'line-through solid rgb(49, 46, 46)');

        // First check that the task isn't completed initially
        cy.get('li.todo-item').contains('Watch video')
            .parents('li.todo-item')
            .find('span.checker')
            .should('have.class', 'checked');

        //For setup simplicity second test case is in the same "it"

        // Click the toggle icon 
        cy.get('li.todo-item').contains('Watch video')
        .parents('li.todo-item')
        .find('span.checker') 
        .click();

        // Check that the task is now marked as completed
        cy.get('li.todo-item').contains('Watch video')
        .parents('li.todo-item')
        .find('span.editable')
        .should('not.have.css', 'text-decoration', 'line-through solid rgb(49, 46, 46)');

        // First check that the task isn't completed initially
        cy.get('li.todo-item').contains('Watch video')
            .parents('li.todo-item')
            .find('span.checker')
            .should('have.class', 'unchecked');
        })
  });