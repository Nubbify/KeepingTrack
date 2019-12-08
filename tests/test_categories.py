import json

from data.models import User, Category, Note, NoteCategory

def setup_get_token(client: object, app: object) -> object:
    with app.app_context():
        if User.query.filter(User.username == "ctest").first() is None:  # create user if needed
            client.post("/api/auth/register", data={"username": "ctest", "password": "original", "email": "cat@test.com"})

    res = client.post("/api/auth/login", data={"username": "ctest", "password": "original"})
    return res.json['access_token']

def setup_make_note(client, app, token):
	res = client.post("/api/notes", headers={'Authorization':'Bearer '+token}, data={"title":"TEST!", "data":"test?"})
	#print(type((res)))
	return res['id']

def test_add_category(client,app):
	token = setup_get_token(client,app)
	res = client.post("/api/categories", headers={'Authorization':'Bearer '+token}, data={"name": "testing", "color": "#010101"})
	#print(res)
	assert res.status_code == 200
	with app.app_context():
		cat = Category.query.filter(Category.name=='testing', Category.color=='#010101').first()
		#print(cat)
		assert cat is not None

	res = client.get("api/categories/testing", 
						headers= {'Authorization':'Bearer '+token},
						data={})
	#print(res)
	assert res.status_code == 200

def test_add_notecat(client,app):
    print("start")
    token = setup_get_token(client, app)
    token = str(token)
    print("making note")
    res = client.post("/api/notes", headers={'Authorization': 'Bearer ' + token},
                      data={"title": "TEST", "data": "test"})
    print("making cat")
    res = client.post("/api/categories", headers={'Authorization': 'Bearer ' + token},
                      data={"name": "testingw", "color": "#010101"})
    print(token)
    access_headers = {
        'Authorization': 'Bearer ' + token
    }

    res = client.post("/api/notecat/1", headers= access_headers,data={"name":"testingw"})
                      #data={})#dict(name="testingw"))
    assert res.status_code == 200







