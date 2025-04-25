import pytest
import pymongo
from pymongo.errors import WriteError
from unittest.mock import patch
from src.util.dao import DAO
import os

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




@pytest.fixture
def test_db():
    # Start patching getValidator
    patcher = patch("src.util.dao.getValidator")  # <-- Change this line!
    mock_get_validator = patcher.start()
    
    # Configure the mock validator
    mock_get_validator.return_value = {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["name", "email"],
            "properties": {
                "name": {"bsonType": "string"},
                "email": {
                    "bsonType": "string",
                    "uniqueItems": True  # Ensures unique email
                }
            }
        }
    }

    # Setup test database
    client = pymongo.MongoClient(os.getenv("MONGO_URL"))
    db = client.testdb
    
    yield db  # Provide the database to the test
    
    # Teardown: Cleanup database and stop patcher
    client.drop_database("testdb")
    patcher.stop()

def test_dummy():
    assert 1 == 1

def test_create_success(test_db):
    dao = DAO(collection_name="test_users")
    data = {"name": "Alice", "email": "alice@example.com"}
    result = dao.create(data)
    assert result == data
