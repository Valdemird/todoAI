# this is a simple todos API flask application using flask-restx
from flask import Flask

from flask_sqlalchemy import SQLAlchemy

from config import app

from routes import blueprint

# register blueprint in the flask application
app.register_blueprint(blueprint)
# run the flask server
app.run(host="0.0.0.0", port=50100, debug=True)