import pytest
from fastapi.testclient import TestClient
from unittest.mock import Mock, patch
from app.main import app


@pytest.fixture
def client():
    """Create a test client for the FastAPI app."""
    return TestClient(app)
