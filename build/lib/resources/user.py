from flask_restful import Resource, reqparse
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from data.models import db, User
import re


parser = reqparse.RequestParser()
parser.add_argument('username', help='Username cannot be blank', required=True)
parser.add_argument('password', help='Password cannot be blank', required=True)


class UpdateUserEmail(Resource):
    @jwt_required
    def put(self):
        try:
            data = parser.parse_args()
            result = re.match(r"[^@]+@[^@]+\.[^@]+",data['email'])
            if not result:
                return {
                    'email': data['email']
                }, 400

            user = db.session.query(User).filter(User.username == get_jwt_identity()).first()
            user.email = data['email']
            db.session.commit()
            

            return 200
        except Exception:
            raise Exception
