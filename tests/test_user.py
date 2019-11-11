from data.models import User

#use admin user for tests
def setup_get_token(client, app):
    with app.app_context():
        if User.query.filter(User.username == "utest").first() is None: #create user if needed
            client.post("/api/auth/register", data={"username": "utest", "password": "original", "email": "failure@test.com"})

    res = client.post("/api/auth/login", data={"username": "utest", "password": "original"})
    #print(res.json['access_token'])
    return res.json['access_token']

def test_valid_email_change(client, app):
    """ Change email for a user """
    token = setup_get_token(client,app) #token is not encrypted at this point
    access_headers = {
        'Authorization' : 'Bearer ' + token
    }
    res = client.put("/api/user/email", headers = access_headers, data={"new_email": "success@test.com"})
    print(res)
    assert res.status_code == 200
    #check that change stuck
    with app.app_context():
        user = User.query.filter(User.username == "utest").first()
        assert user.email == "success@test.com"

def test_invalid_email_change(client, app):
    token = setup_get_token(client, app)  # token is not encrypted at this point
    access_headers = {
        'Authorization': 'Bearer ' + token
    }
    res = client.put("/api/user/email", headers=access_headers, data={"new_email": "successtest.com"})
    print(res)
    assert res.status_code == 400
    # check that change stuck
    with app.app_context():
        user = User.query.filter(User.username == "utest").first()
        assert user.email == "failure@test.com"



def test_successful_password_change(client, app):
    token = setup_get_token(client, app)  # token is not encrypted at this point
    access_headers = {
        'Authorization': 'Bearer ' + token
    }
    res = client.put("/api/user/password", headers=access_headers, data={"old_password":"original", "new_password":"newpass"})
    print(res)
    assert res.status_code == 200
    # check that change stuck
    with app.app_context():
        user = User.query.filter(User.username == "utest").first()
        assert user.password == "newpass"

def test_failed_password_change(client, app):
    token = setup_get_token(client, app)  # token is not encrypted at this point
    access_headers = {
        'Authorization': 'Bearer ' + token
    }
    res = client.put("/api/user/password", headers=access_headers, data={"old_password":"wrongpass", "new_password":"newpass"})
    print(res)
    assert res.status_code == 400
    # check that change stuck
    with app.app_context():
        user = User.query.filter(User.username == "utest").first()
        assert user.password == "original"