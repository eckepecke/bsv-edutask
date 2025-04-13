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

## Step 1: Map Actions and Outcomes

- **Objective**: Identify all possible interactions with the system
- **Process**:
  - List user actions (clicks, inputs, etc.)
  - Note system triggers (API calls, scheduled jobs)
- **Example** (for login feature):
  - Action: User submits credentials
  - Expected: Successful/unsuccessful authentication

## Step 2: Identify Conditions

- **Objective**: Determine factors affecting outcomes
- **Process**:
  - Identify all conditions that will affect the outcome of the action.
- **Techniques**:
  The following teckniques are usefule for deciding what input values are relevant for the test case:
  - **Boundary Value Analysis**: Test edge cases (min/max values)
  - **Equivalence Partitioning**: Group similar inputs
- **Example** (for age validation):
  - Boundaries: -1, 0, 17, 18, 120, 121
  - Partitions: Invalid (<0), Underage (0-17), Valid (18-120)

## Step 3: Determine Combinations

- **Objective**: Create test scenarios
- **Process**:

  - Create all combinations or filter for relevant
    combinations based on domain knowledge.

- **Example** (for log in authentication):

- 1. **Valid password + Invalid username**

- 2. **Invalid password + Valid username**

- 3. **Invalid password + Invalid username**

- 4. **Valid password + Valid username**

## Step 4: Define Expected Outcomes

- **Objective**: To clearly define the expected behaviour of the system.
- **Process**:
  - For each combination assign the expected outcome
  - **Example** (for the combinations in Step 3 example):
  - 1. Failure. Ensures the system correctly denies access when the username is incorrect, even if the password is valid.
  - 2.  Failure. Checks that the system rejects login attempts when the password is incorrect, even if the username is correct.
  - 3. Failure. Verifies that the system does not authenticate users when both credentials are incorrect.
  - 4. Successful login. Verifies that the system does authenticate users when both credentials are correct.

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

- **Impossible ↔ Underage**: Test -1, 0, 1
- **Underage ↔ Valid**: Test 17, 18
- **Valid ↔ Impossible**: Test 120, 121

**Test Cases:**  
| Value | Expected Result |  
|-------|-----------------|  
| -1 | Impossible |  
| 0 | Underage |  
| 1 | Underage |  
| 17 | Underage |  
| 18 | Valid |  
| 120 | Valid |  
| 121 | Impossible |

**Conclusion**: Combining BVA and EP ensures coverage of edge cases and minimizes redundant testing.

## 3. Designing Test Cases

### Scenario

To open the door at the entrance of a company building from the outside, one must either:

- Hold a valid company card to a sensor for at least two seconds, or
- Have the door automatically unlocked by the porter
- The door can always be opened from the inside

### Identification of Conditions and Actions

#### Actions:

- 1. Opening the door with a valid card.
- 2. Opening the door with an invalid card.
- 3. Opening the door from the inside.
- 4. Porter opens the door.

#### Outcomes:

- Door opens; door remains closed

#### Conditions:

- 1. Card-validity
- 1. Porter or regular person
- 1. Inside or outside

### Valid Combinations and Expected Outcomes

| Card Valid | Role    | Location | Time at sensor          | Expected Outcome    |
| ---------- | ------- | -------- | ----------------------- | ------------------- |
| Yes        | Regular | Outside  | => 2                    | Door opens          |
| No         | Regular | Outside  | < 2                     | Door remains closed |
| ???        | Porter  | Outside  | ???                     | Door opens          |
| ???        | Porter  | Outside  | ???                     | Door opens (maybe?) |
| —          | Anyone  | Inside   | ??? Presses exit button | Door opens          |

---

## References

[List any external sources used]