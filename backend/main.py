# server.py
# this is a simple todos API flask application using flask-restx

from flask import Flask, Blueprint
from flask_restx import Api, Resource, fields, Namespace

# a list that will act as a database for this example
todosDB = []

# create a flask application
app = Flask(__name__)

# use this only if the flask application is behind a reverse proxy
# from werkzeug.middleware.proxy_fix import ProxyFix
# app.wsgi_app = ProxyFix(app.wsgi_app)

# create a flask blueprint for API application
blueprint = Blueprint('api', __name__, url_prefix='/api')

# create an API application attached to the blueprint
# you can also attacht he API application directly to the flask application
# use doc=False to disable swagger UI page
# use validate=True to enable request validation by default in all api endpoints/resources
api = Api(blueprint,
          title="Example API application",
          description="An example API application using flask-restx",
          version="1.0",
          doc="/swagger/",
          validate=True
          )

# register blueprint in the flask application
app.register_blueprint(blueprint)

# create an API namespace
# Namespace is a group of API endpoints/routes like an MVC API controller
todosCtrlr = Namespace(
    'todos', path="todos", description='Todos API Controller')

# create API models for various api endpoints
# the data type and data validation for each field in API model can be specified
# the request JSON objects can be validated or response JSON objects can be mapped using this API models
createTodoCommand = todosCtrlr.model('Create Todo command', {
    'task': fields.String(required=True, description='Todo details')
})

updateTodoCommand = todosCtrlr.model('Update Todo command', {
    'task': fields.String(required=True, description='Todo details')
})

todoDto = todosCtrlr.model('Todo DTO', {
    'id': fields.Integer(description='Id of Todo'),
    'task': fields.String(description='Todo details')
})

# create a namespace endpoint / controller endpoint by specifying the route
# A controller route is repesented by a python class inheriting the "Resource" base class
# The HTTP request handling functions are defined using the get, post, put, delete methods in the class
@todosCtrlr.route("/")
class TodosList(Resource):
    @todosCtrlr.marshal_list_with(todoDto)
    def get(self):
        # this method handles GET request of the API endpoint
        # return all database todo objects in response
        return todosDB

    @todosCtrlr.expect(createTodoCommand)
    def post(self):
        # this method handles POST request of the API endpoint
        # create a todo object in the database using the JSON from API request payload
        newTodo = todosCtrlr.payload
        newId = 1 if len(todosDB) == 0 else 1+max([x["id"] for x in todosDB])
        todosDB.append({"id": newId, "task": newTodo["task"]})


# extract id variable of endpoint from URL segment for use in the request handling functions
@todosCtrlr.route("/<int:id>")
class Todo(Resource):
    @todosCtrlr.marshal_with(todoDto)
    def get(self, id):
        # this method handles GET request of the API endpoint
        # get the todo object based on id from request URL
        desiredTodos = [x for x in todosDB if x["id"] == id]
        if len(desiredTodos) > 0:
            # return the todo object in response
            return desiredTodos[0]
        # return a 404 error code since todo object was not found
        todosCtrlr.abort(404, f"TODO with id {id} does not exist")

    @todosCtrlr.expect(updateTodoCommand)
    @todosCtrlr.marshal_with(todoDto)
    def put(self, id):
        # this method handles PUT request of the API endpoint
        # get the index of required todo object based on id from request URL
        TodoDbIds = [x["id"] for x in todosDB]
        if not id in TodoDbIds:
            # return a 404 error code since todo object was not found
            todosCtrlr.abort(404, f"TODO with id {id} does not exist")
        todoInd = [x["id"] for x in todosDB].index(id)

        # update the required todo object based on the PUT request payload
        todosDB[todoInd]["task"] = todosCtrlr.payload["task"]

        # return the updated todo object in response
        return todosDB[todoInd]

    def delete(self, id):
        # this method handles DELETE request of the API endpoint
        # get the index of required todo object based on id from request URL
        TodoDbIds = [x["id"] for x in todosDB]
        if not id in TodoDbIds:
            # return a 404 error code since todo object was not found
            todosCtrlr.abort(404, f"TODO with id {id} does not exist")
        todoInd = [x["id"] for x in todosDB].index(id)

        # delete the desired todo object and return 204 response code
        todosDB.remove(todosDB[todoInd])
        return "", 204

api.add_namespace(todosCtrlr)

# run the flask server
app.run(host="0.0.0.0", port=50100, debug=True)