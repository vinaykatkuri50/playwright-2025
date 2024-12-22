Feature: User Login
Scenario: Successful Login with credentials
    Given the user is on the login page
    When the user enters a valid email and pasword
    Then the user should see their email and password in the URL