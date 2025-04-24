import pytest
from unittest.mock import patch, MagicMock

from src.controllers.usercontroller import UserController


# Test cases

# Email        | Format    | Exists    | Outcome
# ---------------------------------------------
# Provided     | Correct   | Yes, once | User returned
# Provided     | Correct   | Yes, more | User returned
# Provided     | Correct   | No        | None returned
# Provided     | Incorrect | -         | ValueError raised
# Not provided | -         | -         | ValueError raised
# --------------------------------------------------------
# Database operation fails             | Exception raised


@pytest.fixture
def mock_user_controller():
    mock_dao = MagicMock()

    mock_user = {'email': 'valid@example.com'}
    mock_dao.find.return_value = [mock_user]

    controller = UserController(dao=mock_dao)
    return controller

def test_get_user_by_email_success(mock_user_controller):
    # Assert that user is returned when passing existing email
    result = mock_user_controller.get_user_by_email('valid@example.com')
    assert result == {'email': 'valid@example.com'}

def test_get_user_by_email_double_entries(mock_user_controller):
    # Assert that user is returned when passing existing email with multiple entries
    mock_user_controller.dao.find.return_value = [{'email': 'valid@example.com'}, {'email': 'valid@example.com'}]

    result = mock_user_controller.get_user_by_email('valid@example.com')
    assert result == {'email': 'valid@example.com'}

def test_get_user_by_email_not_found(mock_user_controller):
    # Assert that None is returned when incorrect email format is passed
    mock_user_controller.dao.find.return_value = []
    result = mock_user_controller.get_user_by_email('error@example.com')
    assert result is None

def test_get_user_by_email_bad_format(mock_user_controller):
    # Assert that ValueError is raised when passing bad email format
    with pytest.raises(ValueError):  
        mock_user_controller.get_user_by_email("error.se")

def test_get_user_by_email_empty_string(mock_user_controller):
    # Assert that ValueError is raised when passing empty string
    with pytest.raises(ValueError):
        mock_user_controller.get_user_by_email("")

