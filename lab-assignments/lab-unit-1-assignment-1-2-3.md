# PA1417 Basic System Verification - Lab Assignments

## Team Information

- Team Member 1: Erik O.
- Team Member 2: Karl W.

## Work Distribution

For Assignment 1:

- Team Member 1: Made first draft of full assignment.
- Team Member 2: Completed and complemented it.

# Assignment 1: The Test Design Technique

## 1. The 4-Step Test Design Technique

This structured approach helps create comprehensive test suites to verify system behavior. Here's how to implement it:

## Step 1: Identify actions and expected outcomes

- **Objective**: Identify all possible interactions with the system under test
- **Process**:
  - List user actions (clicks, inputs, etc.)
  - List possible expected outcomes
  - Note system triggers (API calls, scheduled jobs)
- **Example** (for login feature):
  - Action: User submits credentials
  - Expected: Successful/unsuccessful authentication

## Step 2: Identify Conditions

- **Objective**: Determine factors affecting outcomes
- **Process**:
  - Identify all conditions (parameters, system states) that will affect the outcome of the action.
- **Techniques**:
  The following techniques are usefule for deciding what input values are relevant for the test case:
  - **Boundary Value Analysis**: Test edge cases (value at boundaries, +/- 1)
  - **Equivalence Partitioning**: Define conditions based on expected outcomes
- **Example** (for age validation):
  - Boundaries: -1, 0, 17, 18, 120, 121
  - Partitions: Invalid (<0), Underage (0-17), Valid (18-120)

## Step 3: Determine Combinations

- **Objective**: Create test scenarios
- **Process**:

  - Create all combinations or filter for relevant combinations based on domain knowledge.

- **Example** (for log in authentication):
  1. **Valid password + Invalid username**
  2. **Invalid password + Valid username**
  3. **Invalid password + Invalid username**
  4. **Valid password + Valid username**

## Step 4: Define Expected Outcomes

- **Objective**: Clearly define the expected behavior of the system.
- **Process**:
  - For each combination, assign the expected outcome.
  - Combinations can be collapsed if various values of the condition do not impact the expected outcome.
- **Example** (for the combinations in Step 3 example):
  1. **Failure**: Ensures the system correctly denies access when the username is incorrect, even if the password is valid.
  2. **Failure**: Checks that the system rejects login attempts when the password is incorrect, even if the username is correct.
  3. **Failure**: Verifies that the system does not authenticate users when both credentials are incorrect.
  4. **Successful login**: Verifies that the system does authenticate users when both credentials are correct.

## Why This Method Works

1. **Covers Important Cases**  
   Helps make sure all the key parts of the system are tested.

2. **Saves Time and Effort**  
   Focuses on the most useful tests, so you don’t waste time on unimportant ones.

3. **Easy to Understand and Track**  
   Makes it clear what’s being tested and why.

4. **Can Be Reused**  
   Works well for testing new features and checking that old ones still work.

## 2. Boundary Value Analysis and Equivalence Partitioning

### 1. Explanation of Boundary Value Analysis (BVA) and Equivalence Partitioning (EP)

**Boundary Value Analysis (BVA):**

- A testing technique where test cases are designed around the **edges** of input ranges.
- Tests values **at, below, and above** boundaries to catch common errors (e.g., off-by-one).
- **Example**: For a system accepting inputs between 1 and 10, test values like 0, 1, 10, and 11.

**Equivalence Partitioning (EP):**

- Divides input data into **groups (partitions)** where all values in a partition behave similarly.
- Tests one representative value per partition to minimize redundancy.
- **Example**: For age validity (0–120), partitions could be:
  - Invalid (age < 0 or > 120),
  - Underage (0 ≤ age < 18),
  - Valid (18 ≤ age ≤ 120).
  - Test values is then selected in each of these categories, e.g. -5, 5, 20 and 130.

---

### 2. Comparison of Usability

| **Criteria**     | **BVA**                                            | **EP**                                            |
| ---------------- | -------------------------------------------------- | ------------------------------------------------- |
| **Focus**        | Edge cases and boundaries                          | Grouping similar inputs                           |
| **Strengths**    | Detects boundary-related errors (e.g., off-by-one) | Reduces redundant test cases                      |
| **Weaknesses**   | Requires precise boundary definitions              | May miss edge-case defects                        |
| **Best Used**    | For numerical ranges and discrete values           | For categorizing inputs into valid/invalid groups |
| **Combined Use** | EP defines partitions; BVA tests their edges       | Ensures efficiency and thoroughness               |

---

### 3. Application to the Age Validity Scenario

**Equivalence Partitions (EP):**

1. **Impossible**:
   - Age < 0 (e.g., -5)
   - Age > 120 (e.g., 130)
2. **Underage**: 0 ≤ age ≤ 17 (e.g., 10)
3. **Valid**: 18 ≤ age ≤ 120 (e.g., 25)

**Boundary Values (BVA):**

- **Boundary values**: 0, 120, 18
- **Boundary values analysis**: -1,0,1, 119, 120, 121, 17, 18, 19

**Test Cases:**  
| Value | Expected Result |  
|-------|-----------------|  
| -1 | Impossible |  
| 0 | Underage |  
| 1 | Underage |  
| 17 | Underage |  
| 18 | Valid |  
| 19 | Valid |  
| 119 | Valid |  
| 120 | Valid |  
| 121 | Impossible |

**Conclusion**: Combining BVA and EP ensures coverage of edge cases and minimizes redundant testing.

## 3. Designing Test Cases

This answer will follow the design test technique to identify all relevant test cases for the scenario:

- Step 1: Identify actions and expected outcomes
- Step 2: Identify Conditions
- Step 3: Determine Combinations
- Step 4: Define Expected Outcomes

A _test case_ is a precise description of a single test. At minimum it contains:

- ID
- Action: an activity of the system under test that we evalaute
- Inputs: the list of conditions that represent the situation
- Expected outcome: the behavior the system is expected to exhibit given the inputs

### The scenario

To open the door at the entrance of a company building from the outside, one must either:

- Hold a valid company card to a sensor for at least two seconds, or
- Have the door automatically unlocked by the porter
- The door can always be opened from the inside

### Step 1: Identification of Conditions and Actions

1. **Action(s)** and **expected outcome**:
   - door _can be_ [opened, not opened]

#### Actions:

- 1. Opening the door with a valid card.
- 2. Opening the door with an invalid card.
- 3. Opening the door from the inside.
- 4. Porter opens the door.

#### Outcomes:

- Door opens; door remains closed

### Step 2: Identify Conditions:

2. **Condition(s)**:
   - card _can be_ [valid; invalid; not present]
   - duration at sensor _can be_ [less than two seconds, two seconds or more]
   - door opener location _can be_ [inside; outside]
   - porter action _can be_ [opened, not openend]

### Step 3-4: Determine Combinations and Expected Outcomes

Test cases are collapsed below because certain parameters doesn't matter for the door, given some circumstances (e.g. if card is invalid, the time at sensor is not relevant).

| #   | Card        | Duration at sensor    | Door opener location | Porter action | Door       |
| --- | ----------- | --------------------- | -------------------- | ------------- | ---------- |
| 1   | valid       | two seconds or more   | outside              | not opened    | opened     |
| 2   | valid       | less than two seconds | outside              | not opened    | not opened |
| 3   | invalid     | -                     | outside              | not opened    | not opened |
| 4   | not present | -                     | outside              | not opened    | not opened |
| 5   | -           | -                     | outside              | opened        | opened     |
| 6   | -           | -                     | inside               | -             | opened     |

---

# Assignment 2: Unit Testing

## 1. Mocking

### Explanation of Mocking

Mocking is a technique used in software testing for simulating dependencies like method calls, external services, API-calls. In a unit test we want to test an isolated part of the code. When a test relies on variables that are unavailable or unpredictabe like an API-call for today's weather, mocking saves the day by replacing these dependencies with the variables of our choice. This allows tests to focus exclusively on the logic of the logic we are trying to test.

### Purpose of Mocking in Unit Testing

The main purpose of Mocking is to **isolate the code under test** by removing external dependencies. There are also other benefits that come with it. Here are a few:

#### Speed & Efficiency

- **Skip slow tasks** (like waiting for network calls) to make tests run faster.  
  _Example:_ Avoid real API calls or database operations that take a long time to complete.

#### Consistency

- **Prevent random failures** caused by things you can’t control (like a broken internet connection or changing data).  
  _Example:_ Use fake data so your test works the same way every time.

#### Verification

- **Check if your code talks to other parts correctly**.  
  _Example:_ Confirm if a method was called with the right inputs, like checking if `sendEmail("user@test.com")` happened.

#### Control & Predictability

- Lets you **create fake scenarios** (like errors or special cases) to see how your code reacts.  
  _Example:_ Make a fake API return an error code (like "500") to test your error-handling code.

## 2. Unit Testing for User Controller

### Test Cases for get_user_by_email Function

| Email        | Format    | Exists    | Outcome           |
| ------------ | --------- | --------- | ----------------- |
| Provided     | Correct   | Yes, once | User returned     |
| Provided     | Correct   | Yes, more | User returned     |
| Provided     | Correct   | No        | None returned     |
| Provided     | Incorrect | -         | ValueError raised |
| Not provided | -         | -         | ValueError raised |

### Implementation

Link to test file in repository: https://github.com/eckepecke/bsv-edutask/blob/master/backend/test/test_usercontroller.py

### Test Execution Output

![Alt text](./results_tests.png)

The implementation of the get_user_by_email is flawed. Docstring claims it will return None when user does not exist. Therefore the failure occurs during the tests.

### Test Coverage Interpretation

The test coverage output shows that 79% of the lines in the UserController class, have been executed at least once. The lines 42-46 have been marked as missing, there is no test validating this part of the code. These lines refer to the update method.

# Assignment 3: Integration Testing

## 1. Test Levels

### Difference in Scope Between Unit and Integration Tests

Unit testing verifies that a single component (e.g., a class, method, or function) behaves as expected in isolation, often by mocking external dependencies. Integration testing checks if multiple components or systems work together correctly, validating interactions, data flow, and dependencies (e.g., APIs, databases).

### Different Purposes of Mocking in Unit vs. Integration Tests

[Your explanation here]

## 2. Integration Testing for DAO and MongoDB

### List of Test Cases

[List test cases derived using test design technique]

### Pytest Fixture for Database Interaction

```python
# Your fixture code here
```

### Implementation of Test Cases

Link to test file(s) in repository: [Insert link here]

### Test Execution Results

```
# Console output from pytest
```

### Evaluation Statement

[Your evaluation of the test results]

---

## References

Lecture 1
Lecture 2
