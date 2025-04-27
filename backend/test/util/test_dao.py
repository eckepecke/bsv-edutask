import os
import pytest
import pymongo
from pymongo.errors import WriteError
from unittest.mock import patch
from src.util.dao import DAO
from dotenv import load_dotenv
load_dotenv()

@pytest.fixture(autouse=True)
def clean_database():
    mongo_url = os.getenv("MONGO_URL", "mongodb://root:root@mongodb:27017")
    db_name = os.getenv("MONGO_INITDB_DATABASE", "rootDb")

    client = pymongo.MongoClient(mongo_url)
    db = client[db_name]

    yield
    db.drop_collection("test_users")

@pytest.fixture
def mock_validator_schema():
    return {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["name", "email"],
            "properties": {
                "name": {"bsonType": "string"},
                "email": {
                    "bsonType": "string",
                    "uniqueItems": True
                }
            }
        }
    }

@pytest.fixture
def mock_validator_db(mock_validator_schema):
    with patch("src.util.dao.getValidator") as mock_get_validator:
        mock_get_validator.return_value = mock_validator_schema
        yield mock_get_validator

@pytest.fixture
def dao_fixture(mock_validator_db):
    dao_instance = DAO(collection_name="test_users")
    return dao_instance

def assert_result_is_not_none(result):
    """Assert that the result is not None."""
    assert result is not None

def assert_result_is_dict(result):
    """Assert that the result is a dictionary."""
    assert isinstance(result, dict)

def assert_result_has_correct_data(result, expected_name, expected_email):
    """Assert that the result contains the correct name and email."""
    assert result["name"] == expected_name
    assert result["email"] == expected_email

def assert_result_contains_id(result):
    """Assert that the result contains an '_id' field."""
    assert "_id" in result

def test_create_success(dao_fixture):
    # Test case for successful creation of a user
    """Assert that the validator allows creating a user with valid data."""
    # Arrange
    complete_data = {
        "name": "Alice",
        "email": "alice@example.com"
    }

    # Act
    result = dao_fixture.create(complete_data)

    # Assert
    # On lecture they claim we can only use one assert per test but I dont see why this is not okay ==> I changed it slightly. I think it was ok before.
    assert_result_is_not_none(result)
    assert_result_is_dict(result)
    assert_result_has_correct_data(result, "Alice", "alice@example.com")
    assert_result_contains_id(result)


def test_create_incomplete(dao_fixture):
    # Incomplete data: Missing 'email' field
    """Assert that the validator raises WriteError when required field is not entered."""

    incomplete_data = {"name": "Alice"}  # Missing 'email'

    # Assert that creating this data raises a WriteError
    with pytest.raises(WriteError):
        dao_fixture.create(incomplete_data)


def test_create_type_constraint_violation(dao_fixture):
    # Data with type constraint violation: 'email' should be a string
    """Assert that the validator raises WriteError when data types are violated."""

    invalid_data = {
        "name": "Alice",
        "email": 12345  # Invalid type (should be a string)
    }

    # Assert that creating this data raises a WriteError
    with pytest.raises(WriteError):
        dao_fixture.create(invalid_data)


def test_create_unique_constraint_violation(dao_fixture):
    # Data with unique constraint violation: Duplicate 'email'
    """Assert that the validator raises WriteError when unique constraint is violated."""

    # First entry
    first_data = {
        "name": "Alice",
        "email": "alice@example.com"
    }

    # Create the first entry
    dao_fixture.create(first_data)
    # Duplicate data
    duplicate_data = {
        "name": "Bob",
        "email": "alice@example.com"
    }

    # Assert that creating this data raises a WriteError
    with pytest.raises(WriteError):
        dao_fixture.create(duplicate_data)

def test_create_invalid_arg_type(dao_fixture):
    # Invalid argument type: Pass an integer instead of a dictionary
    """Assert that the validator raises TypeError when the argument is not a dict."""
    invalid_data = 12345  # Invalid type (should be a dict)

    # Assert that creating this data raises a TypeError
    with pytest.raises(TypeError):
        dao_fixture.create(invalid_data)