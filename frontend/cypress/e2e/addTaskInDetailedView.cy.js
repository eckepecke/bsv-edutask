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