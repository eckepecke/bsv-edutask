describe('Add task in detailed view', () => {
    let uid, name, email;

    beforeEach(() => {
        cy.setupTestEnvironment().then((userData) => {
            uid = userData.uid;
            name = userData.name;
            email = userData.email;
        });
    });

    afterEach(() => {
        cy.cleanupTestUser(uid);
    });

    it('With content in input field clicking the add button should create new Task', () => {
        cy.log('first it');
    
        const newTask = "New Task";
        // Count todo list items
        cy.get('ul.todo-list').find('li.todo-item').its('length').as('initialCount');
    
        cy.get('@initialCount').then(initialCount => {
        // Assert that input is empty
            cy.get('input[placeholder="Add a new todo item"]').type(newTask);
    
            // Try clicking the add button (should be disabled or do nothing)
            cy.get('input[value="Add"]').click()
            
            // Count again and compare
            cy.get('ul.todo-list').find('li.todo-item').its('length').then(postCount => {
                expect(postCount).to.eq(initialCount + 1); // Task should be added
            });
        });
        });

    it('button should be disabled when input field is empty', () => {
      // Make sure we are in detailed view
      cy.get('div.popup').should('exist');
  
      // Count todo list items
      cy.get('ul.todo-list').find('li.todo-item').its('length').as('initialCount');

      // Maybe just check button=disabled?

      cy.get('@initialCount').then(initialCount => {
        // Assert that input is empty
        cy.get('input[placeholder="Add a new todo item"]').should('be.empty');
  
        // Button should be disabled
        cy.get('input[value="Add"]').should('be.disabled');

        // Click it anyway
        cy.get('input[value="Add"]').click()
        
        // Count again and compare
        cy.get('ul.todo-list').find('li.todo-item').its('length').then(postCount => {
          expect(postCount).to.eq(initialCount); // No tasks should be added
        });
      });
    });
  });