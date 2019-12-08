import json
from datetime import datetime
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from flask_restful import Resource, reqparse

from data.Serializer import Serializer
from data.models import db, Note


# parser.add_argument('password', help='Password cannot be blank', required=True)


class GetAllNotes(Resource):
    @jwt_required
    def get(self):
        notes = db.session.query(Note).filter(Note.owner == get_jwt_identity()).all()
        print(type(notes))
        print(notes)
        output = []
        for note in notes:
            d = {
                "id": note.id,
                "parent_id": note.parent_id,
                "owner": note.owner,
                "title": note.title,
                "goal_date": note.goal_date.__str__() if note.goal_date == None else note.goal_date.strftime("%m/%d/%y"),
                "data": note.data,
            }
            output.append(d)
        # need to add notes to return
        # return Serializer.serialize_list(notes), 200
        return json.dumps(output);

    @jwt_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('title', help='Add a title', required=False)
        parser.add_argument('data', help='Add a note body', required=False)
        parser.add_argument('parent_id', required=False)
        parser.add_argument('goal_date', required=False)
        parser.add_argument('parent_id', required=False)
        # id = db.Column(db.Integer, primary_key=True)
        # parent_id = db.Column(db.Integer, db.ForeignKey('note.id'))
        # owner = db.Column(db.Integer, db.ForeignKey('user.id'))
        # title = db.Column(db.String(50))
        # goal_date = db.Column(db.Date)
        # data = db.Column(db.String(5000))
        # parent = db.relationship("Note", remote_side=[id]

        try:
            date = None
            data = parser.parse_args()
            if (data['goal_date'] is not None):
                date = datetime.strptime(data['goal_date'], "%m/%d/%Y").date()
                print(date)
                print(type(date))
            new_note = Note(owner=get_jwt_identity(), title=data['title'], data=data['data']
                            , goal_date=date, parent_id=data['parent_id'])
            db.session.add(new_note)
            db.session.commit()
            print(type(new_note.goal_date))
            date = None
            if (new_note.goal_date is not None):
                date = "" + str(new_note.goal_date.month) + "/" + str(new_note.goal_date.day) + "/" + str(
                    new_note.goal_date.year)
                print(date)

            output = {"id": new_note.id, "title": new_note.title, "data": new_note.data,
                      "goal_date": date,
                      "parent_id": new_note.parent_id, "owner": new_note.owner}
            print(json.dumps(output))
            return json.dumps(output), 200

        except Exception:
            raise Exception


class GetNoteByID(Resource):
    @jwt_required
    def get(self, note_id):
        # parser = reqparse.RequestParser()
        # parser.add_argument('id', help='ID required', required=True)
        # if re.match(r'[^0-9]+', note_id): # might not be needed
        #   return json.dumps({}), 400
        print(get_jwt_identity())
        try:
            # data = parser.parse_args()
            note = db.session.query(Note).filter(Note.owner == get_jwt_identity(), Note.id == note_id).first()
            if note is None:
                return 403
            date = None
            if (note.goal_date is not None):
                date = "" + str(note.goal_date.month) + "/" + str(note.goal_date.day) + "/" + str(note.goal_date.year)

            output = {"id": note.id, "parent_id": note.parent_id, "owner": note.owner,
                      "title": note.title, "goal_date": date, "data": note.data}
            return json.dumps(output), 200
        except Exception:
            raise Exception

    @jwt_required
    def put(self, note_id):
        # if re.match(r'[^0-9]+', note_id): # might not be needed
        #   return json.dumps({}), 400
        parser = reqparse.RequestParser()
        parser.add_argument('title', required=False)
        parser.add_argument('data', required=False)
        parser.add_argument('goal_date', required=False)
        print(type(note_id))
        try:
            data = parser.parse_args()
            note = db.session.query(Note).filter(Note.owner == get_jwt_identity(), Note.id == note_id).first()
            date = None
            if note is None:
                return json.dumps({}), 403
            if data['title'] is not None:
                note.title = data['title']
            if data['data'] is not None:
                note.data = data['data']
            if data['goal_date'] is not None:
                note.goal_date = data['goal_date']
                date = "" + str(note.goal_date.month) + "/" + str(note.goal_date.day) + "/" + str(note.goal_date.year)
            db.session.commit()

            # note = db.session.query(Note).filter(Note.owner == get_jwt_identity(), Note.id == note_id).first()

            output = {"id": note.id, "title": note.title, "data": note.data, "goal_date": date}
            return json.dumps(output), 200
        except Exception:
            raise Exception

    @jwt_required
    def delete(self, note_id):
        # if re.match(r'[^0-9]+', note_id): # might not be needed
        #   return json.dumps({}), 400
        print(get_jwt_identity())

        note = db.session.query(Note).filter(Note.owner == get_jwt_identity(), Note.id == note_id).first()
        if note is None:
            return json.dumps({}), 403
        db.session.delete(note)
        db.session.commit()

        return json.dumps({"message deleted": "true"}), 200
