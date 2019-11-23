import werkzeug
from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from data.models import db, User, Note, Attachment
import json
from flask import jsonify
from data.Serializer import Serializer
import re

class UploadAttachment(Resource):
    @jwt_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('file_name', help='Name your file', required=False)
        parser.add_argument('file', location='files', required = True)
        parser.add_argument('note_id', type='integer', required = True)


        try:
            data = parser.parse_args()
            new_att = Attachment(note=data['note_id'], file=data['file'])
            db.session.add(new_att)
            db.session.commit()

            return 200
        except Exception:
            raise Exception



