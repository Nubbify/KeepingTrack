import os

import click
from flask import Flask, jsonify
from flask.cli import with_appcontext
from flask_restful import Api
from flask_jwt_extended import JWTManager
from data.models import db
from resources.authentication import UserLogin, UserRegistration
from resources.user import UpdateUserEmail, UpdateUserPassword
from resources.notes import GetAllNotes
from flask_cors import CORS


jwt = JWTManager()
api = Api(prefix='/api')
api.add_resource(UserRegistration, '/auth/register')
api.add_resource(UserLogin, '/auth/login')
api.add_resource(UpdateUserEmail, '/user/email')
api.add_resource(UpdateUserPassword, '/user/password')
api.add_resource(GetAllNotes, '/notes')


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    if test_config is None:
        app.config['JWT_SECRET_KEY'] = 'secret-key'
        db_url = "sqlite:///" + os.path.join(app.instance_path, "database.db")
        # ensure the instance folder exists
        os.makedirs(app.instance_path, exist_ok=True)
        app.config['SQLALCHEMY_DATABASE_URI'] = db_url
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    else:
        app.config.update(test_config)

    db.init_app(app)
    app.cli.add_command(init_db_command)
    jwt.init_app(app)

    api.init_app(app)
    CORS(app)

    @app.route('/')
    def index():
        return jsonify({"message": "You're currently at server root."})

    return app


def init_db():
    db.drop_all()
    db.create_all()


def get_db():
    return db


@click.command("init-db")
@with_appcontext
def init_db_command():
    init_db()
    click.echo("Reset the database")


if __name__ == '__main__':
    create_app().run(debug=True)
