describe('Add task in detailed view', () => {
  // create a fabricated user from a fixture
  let uid // user id
  let name // name of the user (firstName + ' ' + lastName)
  let email // email of the user
  let testTitle = "My first task";

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
          cy.get('input#title').type(testTitle);
          cy.get('input[type=submit]').click();
          cy.get('div.title-overlay').contains(testTitle).click();
          
          // Make sure the task "Watch video" exists in the detailed view
          cy.get('ul.todo-list').find('li.todo-item').contains('Watch video');
          
          // Ensure the task starts in "unchecked" state for each test
          cy.get('li.todo-item').contains('Watch video')
            .parents('li.todo-item')
            .find('span.checker')
            .should('have.class', 'unchecked');
          
          cy.get('li.todo-item').contains('Watch video')
            .parents('li.todo-item')
            .find('span.editable')
            .should('not.have.css', 'text-decoration', 'line-through');
            
          cy.log('beforeEach completed');
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

  it('Should mark task as completed when toggler is clicked', () => {
    cy.log('Testing task completion');

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

    cy.get('li.todo-item').contains('Watch video')
      .parents('li.todo-item')
      .find('span.checker')
      .should('have.class', 'checked');
  });

  it('Should mark task as uncompleted when toggler is clicked again', () => {
    cy.log('Testing task un-completion');

    // First mark the task as completed
    cy.get('li.todo-item').contains('Watch video')
      .parents('li.todo-item')
      .find('span.checker')
      .click();
    
    // Verify it's completed
    cy.get('li.todo-item').contains('Watch video')
      .parents('li.todo-item')
      .find('span.checker')
      .should('have.class', 'checked');
    
    // Now click again to uncomplete
    cy.get('li.todo-item').contains('Watch video')
      .parents('li.todo-item')
      .find('span.checker')
      .click();

    // Check that the task is now unmarked as completed
    cy.get('li.todo-item').contains('Watch video')
      .parents('li.todo-item')
      .find('span.editable')
      .should('not.have.css', 'text-decoration', 'line-through solid rgb(49, 46, 46)');

    cy.get('li.todo-item').contains('Watch video')
      .parents('li.todo-item')
      .find('span.checker')
      .should('have.class', 'unchecked');
  });
});