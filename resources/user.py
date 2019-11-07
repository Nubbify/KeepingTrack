from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from data.models import db, User
import re




#parser.add_argument('password', help='Password cannot be blank', required=True)


class UpdateUserEmail(Resource):
    @jwt_required
    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('new_email', help='Email cannot be blank', required=True)
        try:
            data = parser.parse_args()
            result = re.match(r"[^@]+@[^@]+\.[^@]+",data['new_email'])
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


class UpdateUserPassword(Resource):
    @jwt_required
    def put(self):
        parser = reqparse.RequestParser()
        parser.add_argument('old_password', help='Need Old Password', required=True)
        parser.add_argument('new_password', help='Enter New Password', required=True)
        try:
            data = parser.parse_args()
            user = db.session.query(User).filter(User.username == get_jwt_identity()).first()
            result = user.password == data['old_password']
            if not result:
                return {
                           'error': 'old password is incorrect'
                       }, 400

            user = db.session.query(User).filter(User.username == get_jwt_identity()).first()
            user.password = data['new_password']
            db.session.commit()

            return 200
        except Exception:
            raise Exception
