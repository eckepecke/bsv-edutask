import pytest
from unittest.mock import patch, MagicMock

from src.controllers.usercontroller import UserController


# Ground truth
# Log in should be successful when all of the following criteria is met:
# 1. Email is provided with correct format
# 2. The email exist in the database

# If the email exists twice log in should still be successful

# Test cases

# Email        | Format    | Exists    | Outcome
# ---------------------------------------------
# Provided     | Correct   | Yes, once | Success
# Provided     | Correct   | Yes, more | Success
# Provided     | Correct   | No        | Denied
# Provided     | Incorrect | -         | Denied
# Not provided | -         | -         | Denied

@pytest.fixture
def mock_user_controller():
    mock_dao = MagicMock()

    mock_user = {'email': 'valid@example.com'}
    mock_dao.find.return_value = [mock_user]

    controller = UserController(dao=mock_dao)
    return controller

def test_get_user_by_email_success(mock_user_controller):
    result = mock_user_controller.get_user_by_email('valid@example.com')
    assert result == {'email': 'valid@example.com'}

def test_get_user_by_email_not_found(mock_user_controller):
    # If no user is found method will raise exception
    mock_user_controller.dao.find.return_value = []

    # Assert that any exception is raised
    with pytest.raises(Exception):  
        mock_user_controller.get_user_by_email('error@example.com')

def test_get_user_by_email_bad_format(mock_user_controller):
    # Assert that any ValueError is raised when passing bad email format
    with pytest.raises(ValueError):  
        mock_user_controller.get_user_by_email("error.se")

def test_get_user_by_email_double_entries(mock_user_controller):
    # Assert that any ValueError is raised when passing bad email format
    mock_user_controller.dao.find.return_value = [{'email': 'valid@example.com'}, {'email': 'valid@example.com'}]

    result = mock_user_controller.get_user_by_email('valid@example.com')
    assert result == {'email': 'valid@example.com'}