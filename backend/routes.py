from flask import Flask, Blueprint, make_response
from flask_restx import Api, Resource

from models import CheckList, Task, check_list_schema, task_schema

from config import app, db

from api_control import taskCtrlr, taskDto, createTaskCommand, updateTaskCommand
from api_control import listCtrlr, listDto, createListCommand, updateListCommand

# a list that will act as a database for this example
todosDB = []

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





# create a namespace endpoint / controller endpoint by specifying the route
# A controller route is repesented by a python class inheriting the "Resource" base class
# The HTTP request handling functions are defined using the get, post, put, delete methods in the class
@taskCtrlr.route("/")
class TodosDisplay(Resource):
    @taskCtrlr.marshal_list_with(taskDto)
    def get(self):
        # this method handles GET request of the API endpoint
        # return all database todo objects in response        
        tasks = Task.query.all()        
        return tasks
        

    @taskCtrlr.expect(createTaskCommand)
    def post(self):
        # this method handles POST request of the API endpoint
        # create a todo object in the database using the JSON from API request payload
        payload = taskCtrlr.payload        
        list_id = payload.get("list_id")
        if list_id and CheckList.query.get(list_id):
            newTask = Task(value=payload["value"], order=payload["order"],
                           list_id=payload["list_id"])
            db.session.add(newTask)
            db.session.commit()
        else:
            taskCtrlr.abort(404, f"List with id {list_id} does not exist")


# extract id variable of endpoint from URL segment for use in the request handling functions
@taskCtrlr.route("/<int:id>")
class Todo(Resource):
    @taskCtrlr.marshal_with(taskDto)
    def get(self, id):
        # this method handles GET request of the API endpoint
        # get the todo object based on id from request URL
        
        task = Task.query.get(id)
        if task is not None:
            print(task)            
            print(task.list_id)            
            return task_schema.dump(task)
        else:            
            taskCtrlr.abort(404, f"Task with id {id} does not exist")
            
    @taskCtrlr.expect(updateTaskCommand)
    @taskCtrlr.marshal_with(taskDto)
    def put(self, id):        
        task = Task.query.get(id)        
        if task:
            payload = taskCtrlr.payload
            list_id = payload["list_id"]
            list = CheckList.query.get(list_id)
            if list is None:
                taskCtrlr.abort(404, f"List with id {list_id} does not exist")             
            task.value = payload["value"]
            task.order = payload["order"]
            task.list_id = payload["list_id"]
            db.session.merge(task)
            db.session.commit()
            return task_schema.dump(task), 201
        else:
            taskCtrlr.abort(404, f"Task with id {id} does not exist")
            
    def delete(self, id):
        task = Task.query.get(id)

        if task:
            db.session.delete(task)
            db.session.commit()
            return make_response(f"{task.value} successfully deleted", 200)
        else:
            listCtrlr.abort(404, f"Task with id {id} does not exist")
    
api.add_namespace(taskCtrlr)

@listCtrlr.route("/")
class CheckListDisplay(Resource):
    @listCtrlr.marshal_list_with(listDto)
    def get(self):        
        list = CheckList.query.all()
        return list
        
    @listCtrlr.expect(createListCommand)
    def post(self):        
        payload = listCtrlr.payload        
        newList = CheckList(title=payload["title"])
        db.session.add(newList)
        db.session.commit()
        
@listCtrlr.route("/<int:id>")
class CheckListInd(Resource):
    @listCtrlr.marshal_with(listDto)
    def get(self, id):                
        list = CheckList.query.get(id)
        if list is not None:            
            return check_list_schema.dump(list)
        else:            
            listCtrlr.abort(404, f"List with id {id} does not exist")
    
    @listCtrlr.expect(updateListCommand)
    @listCtrlr.marshal_with(listDto)
    def put(self, id):        
        list = CheckList.query.get(id)

        if list:
            payload = listCtrlr.payload
            list.title = payload["title"]
            db.session.merge(list)
            db.session.commit()
            return check_list_schema.dump(list), 201
        else:
            listCtrlr.abort(404, f"List with id {id} does not exist")
            
    def delete(self, id):
        list = CheckList.query.get(id)

        if list:
            db.session.delete(list)
            db.session.commit()
            return make_response(f"{list.title} successfully deleted", 200)
        else:
            listCtrlr.abort(404, f"List with id {id} does not exist")
    
        
api.add_namespace(listCtrlr)