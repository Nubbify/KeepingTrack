import pytest
from data.models import User


def test_good_register(client, app):
    """Register a new user.

    Tests for validation that the username is not already taken.
    """
    res = client.post("/api/auth/register", data={"username": "a", "password": "a"})
    assert res.status_code == 201  # Request okay! Account created.
    with app.app_context():
        assert User.query.filter(User.username == 'a').first() is not None
    res = client.post("/api/auth/register", data={"username": "a", "password": "a"})
    assert res.status_code == 403  # Forbidden to register existing username


def test_login(client):
    """ Register a user and login with that user. Test with wrong password then right password"""
    client.post("/api/auth/register", data={"username": "a", "password": "a"})
    res = client.post("/api/auth/login", data={"username": "a", "password": "b"})
    assert res.status_code == 401
    res = client.post("/api/auth/login", data={"username": "a", "password": "a"})
    assert res.status_code == 200


