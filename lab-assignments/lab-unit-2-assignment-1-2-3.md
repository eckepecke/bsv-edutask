### Test cases Assignment 1

## ID: R8UC1

Preconditions: The user is authenticated, has at least one task associated to his account, and
views this task in detail view mode.

| Test | Field     | Action          | Outcome                                 |
| ---- | --------- | --------------- | --------------------------------------- |
| 1    | Empty     | User clicks Add | Nothing happens, Add button is disabled |
| 2    | Not empty | User clicks Add | Active task created at bottom of list   |

## ID: R8UC2

Preconditions: The user is authenticated, has at least one task with at least one todo item
associated to his account, and views this task in detail view mode.

| Test | Status | Action           | Outcome          |
| ---- | ------ | ---------------- | ---------------- |
| 1    | Active | User clicks icon | Status -> Done   |
| 2    | Done   | user clicks icon | Status -> Active |

## ID: R8UC3

Preconditions: The user is authenticated, has at least one task with at least one todo item
associated to his account, and views this task in detail view mode.

| Test | Status | Action             | Outcome      |
| ---- | ------ | ------------------ | ------------ |
| 1    | Active | User clicks x-icon | Item deleted |
