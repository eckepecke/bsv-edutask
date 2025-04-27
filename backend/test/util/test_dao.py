import pytest
import pymongo
from pymongo.errors import WriteError
from unittest.mock import patch
from src.util.dao import DAO
import os
from dotenv import load_dotenv
load_dotenv()



# Notes till Karl
# Jag tror jag lyckats mocka validatorn. Som jag fattar uppgiften är det det som ska göras.
# Riktig databas + Riktig Dao men vi måste mocka Validatorn? Tänker du samma?
# Jag har ingen aning varför patcher.start() och stop() var nödvändigt.
# Kanske bör vi hitta någon syntax närmare det som fanns i tutorialen? Jag lyckades inte.

# I docker kör jag testerna såhär:
# docker compose down -v
# docker compose build
# docker compose up -d
# docker exec -it edutask-backend pytest test/util




# @pytest.fixture
# def test_db():
#     # Start patching getValidator
#     patcher = patch("src.util.dao.getValidator")
#     mock_get_validator = patcher.start()
    
#     # Configure the mock validator
#     mock_get_validator.return_value = {
#         "$jsonSchema": {
#             "bsonType": "object",
#             "required": ["name", "email"],
#             "properties": {
#                 "name": {"bsonType": "string"},
#                 "email": {
#                     "bsonType": "string",
#                     "uniqueItems": True  # Ensures unique email
#                 }
#             }
#         }
#     }

#     # Setup test database
#     client = pymongo.MongoClient(os.getenv("MONGO_URL"))
#     db = client.testdb
    
#     yield db  # Provide the database to the test
    
#     # Teardown: Cleanup database and stop patcher
#     client.drop_database("testdb")
#     patcher.stop()

@pytest.fixture(autouse=True)
def clean_database():
    mongo_url = os.getenv("MONGO_URL", "mongodb://root:root@mongodb:27017")
    db_name = os.getenv("MONGO_INITDB_DATABASE", "rootDb")

    client = pymongo.MongoClient(mongo_url)
    db = client[db_name]

    yield
    db.drop_collection("test_users")

def test_dummy():
    assert 1 == 1

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

def test_create_success(mock_validator_db):
    # Arrange
    dao = DAO(collection_name="test_users")
    complete_data = {
        "name": "Alice",
        "email": "alice@example.com"
    }

    # Act
    result = dao.create(complete_data)

    # Assert
    # On lecture they claim we can only use one assert per test but I dont see why this is not okay
    assert result is not None
    assert isinstance(result, dict)
    assert result["name"] == "Alice"
    assert result["email"] == "alice@example.com"
    assert "_id" in result


def test_create_incomplete(mock_validator_db):
    # Incomplete data: Missing 'email' field
    incomplete_data = {"name": "Alice"}  # Missing 'email'

    # Assert that creating this data raises a WriteError
    with pytest.raises(WriteError):
        dao = DAO(collection_name="test_users")
        dao.create(incomplete_data)