from flask_restful import Resource, reqparse
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_refresh_token_required, get_jwt_identity,
                                jwt_required)
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

        access_token = create_access_token(identity=data['username'], fresh=True)
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
            access_token = create_access_token(identity=data['username'], fresh=True)
            refresh_token = create_refresh_token(identity=data['username'])
            return {
                'username': current_user.username,
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        else:
            return {'error': 'Wrong credentials'}, 401


class UserRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {'access_token': new_token}, 200

    @jwt_required
    def get(self):
        username = get_jwt_identity()
        return {'username': username}, 200
