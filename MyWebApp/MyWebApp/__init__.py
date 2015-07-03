from flask import Flask

app = Flask(__name__, static_folder='public')

def prepare():
    from MyWebApp.home import home_blueprint
    from MyWebApp.common import common_blueprint
    app.register_blueprint(home_blueprint)
    app.register_blueprint(common_blueprint)
