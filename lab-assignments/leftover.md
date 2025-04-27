```python
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
# om man vill visa success+failures :
# docker exec -it edutask-backend pytest test/util -v





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
```