# PA1417 Basic System Verification - Lab Assignments 4-6

## Team Information

- Team Member 1: [Name]
- Team Member 2: [Name]

## Work Distribution

For Assignment 4:

- Team Member 1: [Contributions]
- Team Member 2: [Contributions]

For Assignment 5:

- Team Member 1: [Contributions]
- Team Member 2: [Contributions]

For Assignment 6:

- Team Member 1: [Contributions]
- Team Member 2: [Contributions]

# Assignment 4: GUI Testing

## 1. Graphical User Interface Tests

### List of Test Cases for Requirement 8

#### R8UC1: Create Todo Items

Preconditions: The user is authenticated, has at least one task associated to his account, and
views this task in detail view mode.

| Test | Condition       | Action          | Outcome                                 |
| ---- | --------------- | --------------- | --------------------------------------- |
| 1    | Field empty     | User clicks Add | Nothing happens, Add button is disabled |
| 2    | Field not empty | User clicks Add | Active task created at bottom of list   |

#### R8UC2: Toggle Todo Items

Preconditions: The user is authenticated, has at least one task with at least one todo item
associated to his account, and views this task in detail view mode.

| Test | Condition      | Action           | Outcome          |
| ---- | -------------- | ---------------- | ---------------- |
| 1    | Task is active | User clicks icon | Status -> Done   |
| 2    | Task is done   | user clicks icon | Status -> Active |

#### R8UC3: Delete Todo Items

Preconditions: The user is authenticated, has at least one task with at least one todo item
associated to his account, and views this task in detail view mode.

| Test | Status | Action             | Outcome      |
| ---- | ------ | ------------------ | ------------ |
| 1    | Active | User clicks x-icon | Item deleted |

### Implementation of Test Cases using Cypress

[Link to Cypress test code in repository: https://github.com/username/repo/path/to/tests]

### Test Execution Results

## Adding to do item

### Test case 1

Output shows that the first test passed. Adding an item with content in the input field is creating a new todo-item.
![Alt text](../cypress_screenshots/add_item_success.png)

### Test case 2

Output shows that the Add button is not disabled when input field is empty.
![Alt text](../cypress_screenshots/add_item_fail.png)

## Toggling existing item

### Test case 1 and 2

Output shows that toggling to "Done" is working.

![Alt text](../cypress_screenshots/toggle_part_1.png)

![Alt text](../cypress_screenshots/toggle_part_2.png)

Output shows that toggling back to active is also working.
![Alt text](../cypress_screenshots/toggle_part_3.png)

## Removing item

### Test case 1

Output shoes that item is removed successfully.
![Alt text](../cypress_screenshots/remove_item.png)

**Test Execution Report:**

[Brief report on test execution, including any failures detected]

# Assignment 5. Declarative vs. Imperative UI Testing

## Imperative (White-Box) Testing

In imperative UI testing, tests explicitly define how to locate and interact with elements by relying on the application’s internal structure (e.g., DOM hierarchy, CSS classes, IDs, or XPaths). For example:

```javascript
cy.get('#login-form > input[type="email"]').type("user@example.com");
```

Here, the test directly references specific DOM properties. This approach requires knowledge of the implementation details, making it brittle—if the UI structure changes (e.g., a CSS class is renamed), the test breaks.

## Declarative (Black-Box) Testing

Declarative tests focus on what the user sees and interacts with, abstracting away implementation details. Elements are identified by their visible characteristics, such as text, labels, ARIA roles, or semantic HTML tags. For example:

```javascript
cy.findByRole("button", { name: "Submit" }).click();
```

This mimics how a user navigates the UI, relying on attributes like button labels. Tests become resilient to structural changes (e.g., CSS renames) as long as the visible behavior remains consistent.

# 2. Discussion: Which Approach is Most Applicable for UI Testing?

## Declarative Testing is Generally Preferable

UI tests aim to verify that the application behaves correctly from the user’s perspective. Declarative tests align with this goal by using the same cues (e.g., button labels, form placeholders) that guide real users.

Imperative tests tightly couple to the DOM structure, making them prone to breaking during refactoring (e.g., changing a `<div id="submit"> to <button class="submit-btn">`). Declarative tests avoid this by depending on stable, user-facing attributes.

Tests written declaratively are easier to understand and modify because they reflect the intent of the interaction (e.g., “click the ‘Login’ button”) rather than technical details.

Conclusion
Declarative testing should probably be the standard approach for UI automation, as it prioritizes user experience and reduces maintenance costs.

# Assignment 5: Non-functional Testing

## Explanation why definition of quality is necessary

Different systems serve different purposes, so the concept of quality can vary widely depending on the context. In a game application, quality might relate to the user experience. For example, how engaging or enjoyable the game is, or to technical aspects such as frame rate (FPS) and responsiveness.s. On an online poker site, framerate does not matter. Quality would instead refer to perhaps stability, making sure that users are not disconnected during play.

Given that quality can take many different forms, it becomes essential to decide what it means. If you dont pin-point what quality is, testing becomes difficult since there is no clear aim for test-engineers to work with.

## Explanation of three qualities

### Reliability

Reliability is the ability of software to perform its tasks under certain conditions for a certain amount of time without failing. For example:

- **Probability of failure-free operation**: Depending on the context, the threshold for reliability can vary.

  - In a **video streaming platform**, a 90% success rate (0.9) might be considered acceptable, as occasional buffering or failure to load may not have critical consequences.

  - In a **flight navigation system** or a **medical monitoring device**, even a 99% success rate (0.99) could be unacceptable, since failures may lead to life-threatening situations.

- **The ability to recover from failures**: A reliable system should not crash or become unusable due to common or expected issues, such as invalid user input. Instead, it should handle such cases gracefully. For example:

  - If a user enters an invalid data type (e.g., text instead of a number), the system should display an error message and prompt for the correct input, rather than crashing.

  - In a payment processing system, if a network connection fails mid-transaction, the system should be able to detect the failure and either retry the request or roll back the transaction to ensure consistency.

  - In a web application, if a backend service is temporarily unavailable, the system might display a friendly error message and automatically attempt to reconnect.

### Maintainability

Maintainability refers to how easy it is to modify, correct,defect, improve performance etc. Some examples are:

- Code readability
- Component independence and modularity
- Documentation quality
- How difficult it is to identify and fix defects

### Accessibility

Accessibility is the degree to which software can be used by people with the widest range of capabilities. This includes:

- Compliance with established accessibility standards (such as WCAG) to ensure inclusive design.
- Compatibility with tools like screen readers, speech recognition software, screen magnifiers, and alternative input devices.
- Clear, consistent, and simple UI design that supports keyboard navigation, high contrast modes, text resizing, not relying solely on color or visual cues.

### Potential Test Techniques for Each Quality

#### Test Technique for Reliabiltiy:

One way ot test the reliability of the system would be to introduce invalid inputs, trying to break the system. If the system is not taking inputs one might consider a stresstest, putting the system under a heavy workload to see where the breaking points are.

#### Test Technique for Maintainability:

There are various tools for testing this quality, such as, Scrutinizer. Used for code analysis, focusing on maintainability, complexity, duplication, and adherence to best practices. Scrutinizer supports multiple languages, but there are also language specific alternatives that one might choose.

#### Test Technique for Accesibility:

Google Lighthouse is an easy way to test accessability ang get quick feedback on how to improve it.

## 2. Static Testing

### Explanation of Static Test Techniques vs. Dynamic Test Techniques

**Static test techniques** are techniques applied to the SUT without executing the code. This could be using tools like static code analyzers, linters, code review tools, and documentation reviewers. Specific examples include tools such as SonarQube, or code linters (ESlint etc). This type of analysis could also be done manually with code reviews.

**Dynamic test techniques** are applied to the SUT while the application is running. This could be tools like test execution frameworks, performance monitors, debuggers, coverage analyzers and accessibility checkers. Exploratory testing and user testing are examples of Dynamic Manual Techniques.

### Static Code Review of EduTask System

#### Extensibility Evaluation

[Static code review of the EduTask system focusing on extensibility]

#### Evaluation of Adding Medium Articles as a Resource Type

[Evaluation of the system's extensibility regarding the proposed change]

# Assignment 6: Continuous Integration

## 1. Continuous Integration of Backend Unit Tests

### GitHub Workflow for Backend Unit Tests

[Link to GitHub Workflow: https://github.com/username/repo/path/to/workflow]

**Description of the Workflow Implementation:**

[Explain how the workflow is set up and what it does]

### Pull Request to Fix get_user_by_email Method

[Link to pull request: https://github.com/username/repo/pull/PR_Number]

**Description of Changes Made:**

[Explain what changes were made to fix the method and how they resolved the issues]

**Evidence of Test Execution:**

[Insert screenshot or description of successful test execution from the PR]

## References

- [Reference 1]
- [Reference 2]
- [Reference 3]
- ...
