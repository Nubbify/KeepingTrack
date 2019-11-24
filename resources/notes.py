from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from data.models import db, User, Note
import json
from flask import jsonify
from data.Serializer import Serializer
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
           d = {"id": note.id, "parent_id" : note.parent_id, "title":note.title}
           output.append(d)
       #need to add notes to return
       return Serializer.serialize_list(notes), 200

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
    def get(self, note_id):
        #parser = reqparse.RequestParser()
        #parser.add_argument('id', help='ID required', required=True)
        #if re.match(r'[^0-9]+', note_id): # might not be needed
         #   return json.dumps({}), 400
        print(get_jwt_identity())
        try:
            #data = parser.parse_args()
            note = db.session.query(Note).filter(Note.owner == get_jwt_identity(), Note.id == note_id).first()
            if note is None:
                return {}, 403
            output = {"id": note.id, "parent_id":note.parent_id,"owner": note.owner,
                 "title": note.title, "goal_date":note.goal_date,"data": note.data}
            return json.dumps(output), 200
        except Exception:
            raise Exception

    @jwt_required
    def put(self, note_id):
        #if re.match(r'[^0-9]+', note_id): # might not be needed
         #   return json.dumps({}), 400
        parser=reqparse.RequestParser()
        parser.add_argument('title', required = False)
        parser.add_argument('data', required = False)
        parser.add_argument('goal_date', required = False)
        print(type(note_id))
        try:
            data = parser.parse_args()
            note = db.session.query(Note).filter(Note.owner == get_jwt_identity(), Note.id == note_id).first()
            if note is None:
                return json.dumps({}), 403
            if data['title'] is not None:
                note.title = data['title']
            if data['data'] is not None:
                note.data = data['data']
            if data['goal_date'] is not None:
                note.goal_date = data['goal_date']
            db.session.commit()

            #note = db.session.query(Note).filter(Note.owner == get_jwt_identity(), Note.id == note_id).first()
            output = {"id": note.id, "title": note.title, "data": note.data, "goal_date":note.goal_date }
            return json.dumps(output), 200
        except Exception:
            raise Exception

    @jwt_required
    def delete(self,note_id):
        #if re.match(r'[^0-9]+', note_id): # might not be needed
         #   return json.dumps({}), 400
        print(get_jwt_identity())

        note = db.session.query(Note).filter(Note.owner == get_jwt_identity(), Note.id == note_id).first()
        if note is None:
            return json.dumps({}),403
        db.session.delete(note)
        db.session.commit()

        return json.dumps({"message deleted": "true"}),200

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