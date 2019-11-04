import os
import tempfile

import pytest

from app import create_app, init_db, get_db

# read in SQL for populating tests data
with open(os.path.join(os.path.dirname(__file__), "data.sql"), "rb") as f:
    _data_sql = f.read().decode("utf8")


@pytest.fixture
def app():
    """Create and configure a new app instance for each tests."""
    # create a temporary file to isolate the database for each tests
    db_fd, db_path = tempfile.mkstemp()
    # create the app with common tests config
    app = create_app(
        {"TESTING": True,
         "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",
         "SQLALCHEMY_TRACK_MODIFICATIONS": False,
         'JWT_SECRET_KEY': 'test'
         })

    # create the database and load tests data
    with app.app_context():
        init_db()
        get_db().engine.execute(_data_sql)

    yield app

    # close and remove the temporary database
    os.close(db_fd)
    os.unlink(db_path)


@pytest.fixture
def client(app):
    """A tests client for the app."""
    return app.test_client()


@pytest.fixture
def runner(app):
    """A tests runner for the app's Click commands."""
    return app.test_cli_runner()


class AuthActions(object):
    def __init__(self, client):
        self._client = client

    def login(self, username="tests", password="tests"):
        return self._client.post(
            "/api/auth/login", data={"username": username, "password": password}
        )

    def logout(self):
        return self._client.get("/api/auth/logout")


@pytest.fixture
def auth(client):
    return AuthActions(client)
