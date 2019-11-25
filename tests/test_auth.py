import json

from data.models import User


def test_good_register(client, app):
    """ Register a new user. Tests for validation that the username or email is not already taken. """
    res = client.post("/api/auth/register", data={"username": "a", "password": "a"})
    assert res.status_code == 400  # Request is invalidly formatted and missing required data.
    res = client.post("/api/auth/register", data={"username": "a", "password": "a", "email": "a@a.com"})
    assert res.status_code == 200  # Request okay! Account created.
    with app.app_context():
        assert User.query.filter(User.username == 'a').first() is not None
    res = client.post("/api/auth/register", data={"username": "a", "password": "a", "email": "b@a.com"})
    assert res.status_code == 403  # Forbidden to register existing username
    res = client.post("/api/auth/register", data={"username": "b", "password": "a", "email": "a@a.com"})
    assert res.status_code == 403  # Forbidden to register existing email


def test_login(client):
    """ Register a user and login with that user. Test with wrong password then right password """
    client.post("/api/auth/register", data={"username": "a", "password": "a", "email": "a@a.com"})
    res = client.post("/api/auth/login", data={"username": "a"})
    assert res.status_code == 400  # Request is invalidly formatted and missing required data
    res = client.post("/api/auth/login", data={"username": "a", "password": "b"})
    assert res.status_code == 401  # Password for existing user is incorrect
    res = client.post("/api/auth/login", data={"username": "a", "password": "a"})
    assert res.status_code == 200  # User is successfully authenticated.


def test_refresh(client):
    """ Register a user, login with that user. Test that user is logged in and then create new token """
    # Before anything, test without tokens for forbidden
    res = client.get("/api/auth/refresh")
    assert res.status_code == 401
    res = client.post("/api/auth/refresh")
    assert res.status_code == 401
    # Now build a user and test for valid usage.
    client.post("/api/auth/register", data={"username": "a", "password": "a", "email": "a@a.com"})
    res = client.post("/api/auth/login", data={"username": "a", "password": "a"})
    tokens = json.loads(res.data.decode("utf-8"))
    headers = {'Authorization': 'Bearer {}'.format(tokens['access_token'])}
    res = client.get("/api/auth/refresh", headers=headers)
    assert res.status_code == 200  # Bearer token is valid

    headers = {'Authorization': 'Bearer {}'.format(tokens['refresh_token'])}
    res = client.post("/api/auth/refresh", headers=headers)
    assert res.status_code == 200  # Got an okay

    tokens = json.loads(res.data.decode("utf-8"))
    headers = {'Authorization': 'Bearer {}'.format(tokens['access_token'])}
    res = client.get("/api/auth/refresh", headers=headers)
    assert res.status_code == 200 # Got an okay with the new token

