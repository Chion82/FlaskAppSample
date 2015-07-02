from MyWebApp.home import home_blueprint
from MyWebApp.home.controllers.home_info import get_home_info
from flask import render_template, jsonify

@home_blueprint.route('/api/home/info')
def API_get_home_info():
	return jsonify(get_home_info())

