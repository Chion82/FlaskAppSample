from MyWebApp.home import home_blueprint
from flask import render_template
import time

@home_blueprint.route('/')
def index():
	return render_template('dist/index.html', time=str(long(time.time())))

