import os
import pathlib

from flask import Flask
from json import JSONEncoder

from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

basedir = pathlib.Path(__file__).parent.resolve()

# create a flask application
app = Flask(__name__)
CORS(app)
#Configuración para Sqlite
#app.config['SQLALCHEMY_DATABASE_URI'] =\
#        'sqlite:///' + os.path.join(basedir, 'database.db')
#Local
#DB_URL = "postgresql://postgres:root@db:5432/postgres"

DB_URL = "postgresql://bootcampuser%40taskappdbresource@taskappdbresource.postgres.database.azure.com:5432/postgres"
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # silence the deprecation warning

db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)
