import os
import pathlib

from flask import Flask
from json import JSONEncoder

from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

basedir = pathlib.Path(__file__).parent.resolve()

# create a flask application
app = Flask(__name__)
#Configuración para Sqlite
#app.config['SQLALCHEMY_DATABASE_URI'] =\
#        'sqlite:///' + os.path.join(basedir, 'database.db')

DB_URL = "postgresql://postgres:root@localhost:5432/postgres"

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # silence the deprecation warning

db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)
