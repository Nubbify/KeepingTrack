import json

from data.models import User, Category, Note, NoteCategory

def setup_get_token(client, app):
    with app.app_context():
        if User.query.filter(User.username == "ctest").first() is None:  # create user if needed
            client.post("/api/auth/register", data={"username": "ctest", "password": "original", "email": "cat@test.com"})

    res = client.post("/api/auth/login", data={"username": "ctest", "password": "original"})
    # print(res.json['access_token'])
    return res.json['access_token']

def setup_make_note(client, app, token):
	res = client.post("/api/notes", headers={'Authorization':'Bearer '+token}, data={"title":"TEST", "data":"test"})
	print(type((res)))
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
						headers={'Authorization':'Bearer '+token},
						data={})
	#print(res)
	assert res.status_code == 200
'''
def test_add_notecat(client,app):
    token = setup_get_token(client, app)
    res = client.post("/api/notes", headers={'Authorization': 'Bearer ' + token},
                      data={"title": "TEST", "data": "test"})
    res = client.post("/api/categories", headers={'Authorization': 'Bearer ' + token},
                      data={"name": "testing", "color": "#010101"})
    res = client.post("/api/categories/note/1", headers={'Authorization': 'Bearer ' + token}, data={"name":"testing"})
    assert res.status_code == 200

'''





