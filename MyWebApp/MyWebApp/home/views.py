from MyWebApp.home import home_blueprint
from flask import render_template
import time

@home_blueprint.route('/')
def index():
	return render_template('index.html', time=str(long(time.time())))
@home_blueprint.route('/about')
def about():
    return render_template('about.html', about='from template render')


