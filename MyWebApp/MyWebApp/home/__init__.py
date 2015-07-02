from flask import Blueprint, render_template, send_from_directory, url_for
from MyWebApp import app
import os

if app.config['DEBUG']==True:
	template_folder = 'templates'
else:
	template_folder = 'templates/dist'

home_blueprint = Blueprint('home', __name__, template_folder=template_folder, static_folder='static', static_url_path='/home/static')

from MyWebApp.home.views import *
from MyWebApp.home.apis import *
