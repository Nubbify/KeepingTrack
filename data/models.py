from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import PasswordType, force_auto_coercion
from data import Serializer

db = SQLAlchemy()


class Attachment(db.Model):
    __tablename__ = 'attachment'
    attachment_id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Integer)
    note = db.Column(db.Integer, db.ForeignKey('note.id'))
    data = db.Column(db.Binary)

    def __repr__(self):
        return '<Attachment of type %a for Note %a>' % (self.type, self.note)

    def serialize(self):
        return Serializer.serialize(self)


class Note(db.Model):
    __tablename__ = 'note'
    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, db.ForeignKey('note.id'))
    owner = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String(50))
    goal_date = db.Column(db.Date)
    data = db.Column(db.String(5000))
    parent = db.relationship("Note", remote_side=[id])

    def __repr__(self):
        return '<Note %a - %a by %a>' % (self.id, self.title, self.owner)

    def serialize(self):
        return Serializer.serialize(self)


force_auto_coercion()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True)
    email = db.Column(db.String(30), unique=True)
    password = db.Column(PasswordType(
        schemes=[
            'pbkdf2_sha512',
            'md5_crypt'
        ]
    ))

    def __repr__(self):
        return '<User %a>' % self.username

    def serialize(self):
        return Serializer.serialize(self)