# Testing Documentation
## Student Task & Progress Manager

### 1. Project Overview
The Student Task & Progress Manager is a web application developed using HTML, CSS, and JavaScript. It helps students add, edit, delete, search, filter, and track their academic tasks.

### 2. Testing Objectives
- Verify that all features work correctly.
- Check task creation, editing, and deletion.
- Verify task completion and progress calculations.
- Test search and filtering functionality.
- Ensure tasks remain saved after refreshing the browser.
- Check responsive design on different screen sizes.
- Identify and fix errors.

### 3. Test Environment
- **Code Editor:** Visual Studio Code
- **Frontend:** HTML5, CSS3
- **Programming Language:** JavaScript
- **Browser:** Google Chrome
- **Storage:** Browser Local Storage

### 4. Test Cases

| Test Case ID | Test Scenario | Expected Result |
|---|---|---|
| TC01 | Open the application | The application should load correctly. |
| TC02 | Add a task with valid details | The task should appear in the task list. |
| TC03 | Submit an empty task name | The application should prevent submission. |
| TC04 | Add a task with a past due date | The application should reject the invalid date. |
| TC05 | Mark a task as completed | The task should be marked completed and the dashboard should update. |
| TC06 | Undo a completed task | The task should return to pending status. |
| TC07 | Edit a task name | The updated task name should appear. |
| TC08 | Delete a task | After confirmation, the task should be removed. |
| TC09 | Search for a task | Only matching tasks should appear. |
| TC10 | Select the Pending filter | Only pending tasks should appear. |
| TC11 | Select the Completed filter | Only completed tasks should appear. |
| TC12 | Refresh the browser | Previously saved tasks should remain available. |
| TC13 | Complete all tasks | The progress indicator should show 100%. |
| TC14 | Open the application on a mobile-sized screen | The layout should adjust to the screen size. |
| TC15 | Search for a task that does not exist | A message should indicate that no matching tasks were found. |

### 5. Testing Procedure
1. Open `index.html` in a web browser.
2. Add a task with a valid name, priority, and due date.
3. Verify that the task appears in the task list.
4. Test the complete, undo, edit, and delete buttons.
5. Search for tasks and apply different filters.
6. Refresh the browser and verify Local Storage persistence.
7. Complete tasks and check the progress indicator.
8. Resize the browser window to check responsive design.
9. Record the actual result of each test case.

### 6. Actual Test Results
Run every test case and record the actual result below.

- **Pass:** The actual result matches the expected result.
- **Fail:** The actual result does not match the expected result.

| Test Case ID | Actual Result | Status |
|---|---|---|
| TC01 | Record after testing | Pending |
| TC02 | Record after testing | Pending |
| TC03 | Record after testing | Pending |
| TC04 | Record after testing | Pending |
| TC05 | Record after testing | Pending |
| TC06 | Record after testing | Pending |
| TC07 | Record after testing | Pending |
| TC08 | Record after testing | Pending |
| TC09 | Record after testing | Pending |
| TC10 | Record after testing | Pending |
| TC11 | Record after testing | Pending |
| TC12 | Record after testing | Pending |
| TC13 | Record after testing | Pending |
| TC14 | Record after testing | Pending |
| TC15 | Record after testing | Pending |

### 7. Conclusion
This testing document defines the test cases required to evaluate the Student Task & Progress Manager. Testing helps verify the application's functionality, data persistence, progress tracking, and responsive layout.

The final testing status should be updated after executing all test cases and resolving any identified issues.

### 8. Future Improvements
- Add user authentication.
- Integrate a backend database.
- Add task reminders.
- Provide advanced progress reports.
- Improve accessibility and automated test coverage.s