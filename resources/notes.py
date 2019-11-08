from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from data.models import db, User, Note
import json
import re


# parser.add_argument('password', help='Password cannot be blank', required=True)


class GetAllNotes(Resource):
    @jwt_required
    def get(self):
       notes = db.session.query(Note).filter(Note.owner == get_jwt_identity()).all()
       print(type(notes))
       print(notes)
       output = []
       for note in notes :
           d = {"title":note.title, "data":note.data, "owner":note.owner}
           output.append(d)
       #need to add notes to return
       return json.dumps(output), 200

    @jwt_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title', help='Add a title', required=True)
        parser.add_argument('data', help='Add a note body', required=False)
            #id = db.Column(db.Integer, primary_key=True)
            #parent_id = db.Column(db.Integer, db.ForeignKey('note.id'))
            #owner = db.Column(db.Integer, db.ForeignKey('user.id'))
            #title = db.Column(db.String(50))
            #goal_date = db.Column(db.Date)
            #data = db.Column(db.String(5000))
            #parent = db.relationship("Note", remote_side=[id]


        try:
            data = parser.parse_args()
            new_note = Note(owner=get_jwt_identity(),title=data['title'], data=data['data'])
            db.session.add(new_note)
            db.session.commit()
            return 200
        except Exception:
            raise Exception


class GetNoteByID(Resource):
    @jwt_required
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', help='ID required', required=False)
        parser.add_argument('title', required=False)
        parser.add_argument('goal_date', required=False)
        parser.add_argument('data', required = False)
        parser.add_argument('parent_id', required = False)
        parser.add_argument('owner', required = False)
        try:
            data = parser.parse_args()
            notes = db.session.query(Note).filter(Note.owner == get_jwt_identity(), Note.id == data['id'],
                                                  Note.title == data['title'],
                                                  Note.goal_date == data['goal_date'],
                                                  Note.parent_id == data['parent_id'], ).all()
            output = []
            for note in notes:
                d = {"title": note.title, "data": note.data, "owner": note.owner}
                output.append(d)
            return json.dumps(output), 200
        except Exception:
            raise Exception
    '''  
        #parser = reqparse.RequestParser()
        #parser.add_argument('new_email', help='Email cannot be blank', required=True)
        try:
            #data = parser.parse_args()
            #result = re.match(r"[^@]+@[^@]+\.[^@]+", data['new_email'])
            if not result:
                return {
                           'error': 'Invalid email format'
                       }, 400

            user = db.session.query(User).filter(User.username == get_jwt_identity()).first()
            user.email = data['new_email']
            db.session.commit()

            return 200
        except Exception:
            raise Exception
       
       '''