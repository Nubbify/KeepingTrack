import json
from datetime import datetime
from flask_jwt_extended import (jwt_required, get_jwt_identity)
from flask_restful import Resource, reqparse

from data.Serializer import Serializer
from data.models import db, Note, NoteCategory, Category

class AllCategories(Resource): #'/api/categories'
	@jwt_required
	def get(self):
		cats = db.session.query(Category).filter(Category.owner == get_jwt_identity()).all()
		output = []
		for cat in cats:
			d = {
				"id": cat.id,
				"name": cat.name,
				"color": cat.color,
			}
			output.append(d)
		return json.dumps(output), 200

	@jwt_required
	def post(self):
		parser = reqparse.RequestParser()
		parser.add_argument('name', required=True)
		parser.add_argument('color', required=False)
		try:
			data = parser.parse_args()
			#maybe add a check to prevent the same exact category from being added twice for one user
			new_cat = Category(owner=get_jwt_identity(), name=data['name'], color=data['color'])
			db.session.add(new_cat)
			db.session.commit()

			output = {"id": new_cat.id, "name": new_cat.name, "color":new_cat.color}
			return json.dumps(output), 200

		except Exception:
			raise Exception




class CategoryByName(Resource): #'/api/categories/<str:category_name>'
	@jwt_required
	def get(self, category_name): #return note ids 
		cat = db.session.query(Category).filter(Category.owner == get_jwt_identity(), Category.name == category_name).first() 
		try:
			if cat is None: 
				return json.dumps({"error": "category not found"}), 403
			cat_id = cat.id
			note_ids = db.query(NoteCategory).filter(NoteCategory.category_id == cat_id).all()
			output = []
			for note_id in note_ids:
				d = {
					"note_id":note_id
				}
				output.append(d)
			return json.dumps(output), 200

		except Exception: #any issues with the above will result in 400
			raise Exception

	@jwt_required
	def delete(self, category_name): #delete a specific category
		cat = db.session.query(Category).filter(Category.owner == get_jwt_identity(), Category.name == category_name).first()
		try:
			if cat is None:
				return json.dumps({"error": "category not found"}), 403
			cat_id = cat.id
			db.session.delete(cat)
			rows = db.session.query(NoteCategory).filter(category_id == cat_id).all()
			count = len(rows)
			for r in rows:
				db.session.delete(r)
			db.session.commit()
			return json.dumps({"count": count}), 200 #count is number of notes that had this category taken off

class NoteCategories(Resource): #'/api/categories/<int:note_id>'
	@jwt_required
	def get(self, note_id): #get all categories associated with a note
		rows = db.session.query(NoteCategory).filter(NoteCategory.note_id == note_id).all()
		output = []
		for r in rows:
			try:
				cat_id = r.category_id
				cat = db.session.query(Category).filter(id == cat_id).first()
				if cat is not None:
					d = {
						"id" : cat.id,
						"name": cat.name,
						"color": cat.color,
					}
					output.append(d)
			except: 
				pass
		return json.dumps(output), 200

	@jwt_required
	def post(self, note_id): #add ONE category to a note
		parser = reqparse.RequestParser()
		parser.add_argument('name', required = True)
		try:
			data = parser.parse_args()		
			cat = db.session.query(Category).filter(Category.owner == get_jwt_identity(), Category.name == data['name']).first()
			if cat is None:
				return json.dumps{"error": "category not found"}, 403
			cat_id = cat.id
			new_nc = NoteCategory(category_id=cat_id, note_id=note_id)
			db.session.add(new_nc)
			db.session.commit()
			return json.jumps({"note_id": note_id, "category_id" : cat_id, "category_name": data['name']}),200
		except Exception:
			return Exception

	@jwt_required
	def delete(self, note_id): #delete ONE category from a note
		parser = reqparse.RequestParser()
		parser.add_argument('name', required = True)
		try:
			data = parser.parse_args()
			cat = db.session.query(Category).filter(Category.owner == get_jwt_identity(), Category.name == data['name']).first()
			if cat is None:
				return json.dumps{"error": "category not found"}, 403
			cat_id = cat.id
			nc = db.sesion.query(NoteCategory).filter(NoteCategory.note_id == note_id, NoteCategory.category_id == cat_id).first()
			if nc is None:
				return json.dumps({"message": "category not present"}), 200
			db.session.delete(nc)
			db.commit()
			return json.dumps({"message":"category removed"}), 200






			