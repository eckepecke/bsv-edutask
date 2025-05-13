describe('Add task in detailed view', () => {
  let uid, name, email;
  let testTitle = "My first task";

  beforeEach(() => {
    cy.setupTestEnvironment({
      taskTitle: testTitle,
      verifyWatchVideoItem: true,
      ensureUnchecked: true
    }).then((userData) => {
      uid = userData.uid;
      name = userData.name;
      email = userData.email;
    });
  });

  afterEach(() => {
    cy.cleanupTestUser(uid);
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