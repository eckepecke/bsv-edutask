describe('Add task in detailed view', () => {
  let uid, name, email;

  beforeEach(() => {
    cy.setupTestEnvironment({
      verifyWatchVideoItem: true
    }).then((userData) => {
      uid = userData.uid;
      name = userData.name;
      email = userData.email;
    });
  });

  afterEach(() => {
    cy.cleanupTestUser(uid);
  });

  it('Clicking remove icon should delete the task from the list', () => {

    // Find the to do item
    cy.get('ul.todo-list').find('li.todo-item').contains('Watch video')
    
    // First verify the task exists
    cy.get('li.todo-item').contains('Watch video').should('exist');
    
    // Click the remove icon
    cy.get('li.todo-item').contains('Watch video')
      .parents('li.todo-item')
      .find('span.remover')
      .click()

    // Now check that it is gone
    cy.get('ul.todo-list').contains('Watch video').should('not.exist');
  });
});