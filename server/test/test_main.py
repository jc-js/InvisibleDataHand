class TestMainEndpoints:
    def test_read_root(self, client):
        """Test the root endpoint."""
        response = client.get("/")
        assert response.status_code == 200
        assert response.json() == {"message": "Hello World from FastAPI"}

    def test_simple(self):
        assert 1 + 1 == 2
