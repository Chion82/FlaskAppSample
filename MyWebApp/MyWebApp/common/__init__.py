from flask import Blueprint, render_template, send_from_directory, url_for
from MyWebApp import app
import os

if app.config['DEBUG']==True:
    template_folder = 'templates'
else:
    template_folder = 'templates/dist'

common_blueprint = Blueprint('common', __name__, template_folder=template_folder, static_folder='static', static_url_path='/common/static')
