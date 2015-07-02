from flask import Flask
from MyWebApp.home import home_blueprint
import os

app = Flask(__name__, static_folder='MyWebApp/public')
app.register_blueprint(home_blueprint)

if __name__ == "__main__":
	app.run(debug=True)
