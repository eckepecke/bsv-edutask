/**
 * Sets up a test environment with a user and optionally a task
 * @param {Object} options Configuration options
 * @param {boolean} options.createTask Whether to create a task (default: true)
 * @param {boolean} options.openDetailedView Whether to open the detailed view (default: true)
 * @param {string} options.taskTitle Task title (default: "My first task")
 * @param {boolean} options.verifyWatchVideoItem Whether to verify "Watch video" item exists (default: false)
 * @param {boolean} options.ensureUnchecked Whether to ensure "Watch video" starts unchecked (default: false)
 * @returns {Cypress.Chainable<{uid: string, name: string, email: string}>} User data
 */
Cypress.Commands.add('setupTestEnvironment', (options = {}) => {
  const {
    createTask = true,
    openDetailedView = true,
    taskTitle = "My first task",
    verifyWatchVideoItem = false,
    ensureUnchecked = false
  } = options;

  let userData = { uid: null, name: null, email: null };

  cy.viewport(1280, 1000);
  cy.visit("http://localhost:3000");

  return cy.fixture('user.json').then((user) => {
    return cy.request({
      method: 'POST',
      url: 'http://localhost:5000/users/create',
      form: true,
      body: user
    }).then((response) => {
      userData.uid = response.body._id.$oid;
      userData.name = user.firstName + ' ' + user.lastName;
      userData.email = user.email;

      return cy.login().then(() => {
        if (createTask) {
          cy.get('input#title').type(taskTitle);
          cy.get('input[type=submit]').click();
          
          if (openDetailedView) {
            cy.get('div.title-overlay').contains(taskTitle).click();
            
            if (verifyWatchVideoItem) {
              cy.get('ul.todo-list').find('li.todo-item').contains('Watch video');
              
              if (ensureUnchecked) {
                cy.get('li.todo-item').contains('Watch video')
                  .parents('li.todo-item')
                  .find('span.checker')
                  .should('have.class', 'unchecked');
                
                cy.get('li.todo-item').contains('Watch video')
                  .parents('li.todo-item')
                  .find('span.editable')
                  .should('not.have.css', 'text-decoration', 'line-through');
              }
            }
          }
        }
        
        return cy.wrap(userData);
      });
    });
  });
});

/**
 * Cleans up a test user
 * @param {string} uid User ID to delete
 */
Cypress.Commands.add('cleanupTestUser', (uid) => {
  cy.log('Cleaning up test user');

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