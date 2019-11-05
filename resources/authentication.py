from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, create_refresh_token)
from data.models import db, User


parser = reqparse.RequestParser()
parser.add_argument('username', help='Username cannot be blank', required=True)
parser.add_argument('password', help='Password cannot be blank', required=True)


class UserRegistration(Resource):
    def post(self):
        parser_copy = parser.copy()
        parser_copy.add_argument('email', help='Email cannot be blank', required=True)
        data = parser_copy.parse_args()
        # TODO: Run email against the same regular expression used to update emails: return 403 if failed.
        if db.session.query(User).filter(User.username == data['username']).first():
            return {"error": "User already exists"}, 403
        new_user = User(username=data['username'], password=data['password'], email=data['email'])
        db.session.add(new_user)
        try:
            db.session.commit()
        except Exception:
            return {"error": "Email in use"}, 403

        access_token = create_access_token(identity=data['username'])
        refresh_token = create_refresh_token(identity=data['username'])
        return {
            'username': data['username'],
            'access_token': access_token,
            'refresh_token': refresh_token
        }, 200


class UserLogin(Resource):
    def post(self):
        data = parser.parse_args()
        current_user = db.session.query(User).filter(User.username == data['username']).first()

        if not current_user:
            return {"error": "User not in DB. Register as a new user"}, 404

        if current_user.password == data['password']:
            access_token = create_access_token(identity=data['username'])
            refresh_token = create_refresh_token(identity=data['username'])
            return {
                'username': current_user.username,
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        else:
            return {'error': 'Wrong credentials'}, 401
