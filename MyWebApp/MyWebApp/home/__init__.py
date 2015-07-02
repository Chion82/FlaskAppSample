from flask import Blueprint, render_template, send_from_directory, url_for
import os

home_blueprint = Blueprint('home', __name__, template_folder='templates', static_folder='static', static_url_path='/home/static')

from MyWebApp.home.views import *
from MyWebApp.home.apis import *
