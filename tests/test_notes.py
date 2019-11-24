from data.models import User, Note


# use admin user for tests
def setup_get_token(client, app):
    with app.app_context():
        if User.query.filter(User.username == "utest").first() is None:  # create user if needed
            client.post("/api/auth/register", data={"username": "utest", "password": "original", "email": "failure@test.com"})

    res = client.post("/api/auth/login", data={"username": "utest", "password": "original"})
    # print(res.json['access_token'])
    return res.json['access_token']


def test_get_notes(client, app):
    token = setup_get_token(client, app)
    access_headers = {
        'Authorization': 'Bearer ' + token
    }
    res = client.get("/api/notes", headers=access_headers, data={})
    print(res)
    assert res.status_code == 200


def test_post_notes(client, app):
    token = setup_get_token(client, app)
    access_headers = {
        'Authorization': 'Bearer ' + token
    }
    res = client.post("/api/notes", headers=access_headers, data={"title": "New Note",
                                                                 "goal_date": "01/01/2020",
                                                                 "data": "help"})
    print(res)
    assert res.status_code == 200

    with app.app_context():
        note = Note.query.filter(Note.title == "New Note").first()
        assert note.goal_date == "01/01/2020"
        assert note.data == "help"
        user = User.query.filter(User.username == "utest").first()
        assert note.owner == user.id


def test_get_single_note(client, app):
    token = setup_get_token(client, app)
    access_headers = {
        'Authorization': 'Bearer ' + token
    }

    res = client.post("/api/notes", headers=access_headers, data={"title": "New Note",
                                                                  "goal_date": "01/01/2020",
                                                                  "data": "help"})
    assert res.status_code == 200

    with app.app_context():
        note = Note.query.filter(Note.title == "New Note").first()
        res = client.get("/notes", query_string={"note_id": note.id}, headers=access_headers, data={})
        assert res.status_code == 200


def test_update_note(client, app):
    token = setup_get_token(client, app)
    access_headers = {
        'Authorization': 'Bearer ' + token
    }

    res = client.post("/api/notes", headers=access_headers, data={"title": "New Note",
                                                                  "goal_date": "01/01/2020",
                                                                  "data": "help"})
    assert res.status_code == 200

    with app.app_context():
        note = Note.query.filter(Note.title == "New Note").first()

        res = client.put("/api/notes", query_string={"note_id": note.id}, headers=access_headers,
                    data={"title": "finished note", "data": "task complete"})
        assert res.status_code == 200
        note = Note.query.filter(Note.id == note.id).first()
        assert note.title == "finished note"
        assert note.data == "task complete"


def test_delete_note(client, app):
    token = setup_get_token(client, app)
    access_headers = {
        'Authorization': 'Bearer ' + token
    }

    res = client.post("/api/notes", headers=access_headers, data={"title": "New Note",
                                                                  "goal_date": "01/01/2020",
                                                                  "data": "help"})
    assert res.status_code == 200
    with app.app_context():
        note = Note.query.filter(Note.title == "New Note").first()
        client.delete("/api/notes", query_string={"note_id": note.id}, headers=access_headers, data={})
        assert Note.query.filter(Note.id == note.id) is None

