import pytest
import unittest.mock as mock
from unittest.mock import patch

from src.util.dao import DAO

@pytest.fixture
# I think we are supposed t mock the getValidator but not sure
