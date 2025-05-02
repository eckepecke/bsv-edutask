// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
    cy.fixture('user.json').then((user) => {
      // First create the user via API
      cy.request({
        method: 'POST',
        url: 'http://localhost:5000/users/create',
        form: true,
        body: user
      }).then(() => {
        // Now visit the login page
        cy.visit('http://localhost:3000'); // Adjust this URL to your login page
        
        // Fill in the email field
        cy.contains('div', 'Email Address')
          .find('input[type=text]')
          .type(user.email);
        
        // Submit the form
        cy.get('form').submit();
        
        // Wait for login to complete
        const name = user.firstName + ' ' + user.lastName;
        cy.get('h1').should('contain.text', 'Your tasks, ' + name);
      });
    });
  });