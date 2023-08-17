from flask_restx import fields, Namespace

# create an API namespace
# Namespace is a group of API endpoints/routes like an MVC API controller
taskCtrlr = Namespace(
    'task', path="/task", description='Task API Controller')

# create API models for various api endpoints
# the data type and data validation for each field in API model can be specified
# the request JSON objects can be validated or response JSON objects can be mapped using this API models
createTaskCommand = taskCtrlr.model('Create task command', {
    'value': fields.String(required=True, description='task description'),
    'order': fields.Integer(required=True, description='priority of task'),
    'completed': fields.Boolean(required=True, description='task completion'),
    'list_id': fields.Integer(required=True, description='Task must be assigned to a List')
})

updateTaskCommand = taskCtrlr.model('Update Task command', {
    'value': fields.String(required=True, description='task description'),
    'order': fields.Integer(required=True, description='priority of task'),
    'completed': fields.Boolean(required=True, description='task completion'),
    'list_id': fields.Integer(required=True, description='Task must be assigned to a List')
})

taskDto = taskCtrlr.model('Task DTO', {
    'id': fields.Integer(description='Id of Task'),
    'value': fields.String(description='Task details'),
    'order': fields.Integer(description='Task order'),
    'completed': fields.Boolean(required=True),
    'list_id': fields.Integer(description='Task must be assigned to a List')
})

# create an API namespace for list
listCtrlr = Namespace(
    'list', path="/list", description='List API Controller')

# Models for listCtrlr
createListCommand = listCtrlr.model('Create List command', {
    'title': fields.String(required=True, description='list description'),    
})

updateListCommand = listCtrlr.model('Update List command', {
    'title': fields.String(required=True, description='list description'),    
})

listDto = listCtrlr.model('List DTO', {
    'id': fields.Integer(description='Id of List'),
    'title': fields.String(description='List details')    
})

# create an API for langchain
langchainCtrlr = Namespace(
    'langchain', path="/langchain", description='List API for Langchain')

# Models for listCtrlr
createlangChainCommand = langchainCtrlr.model('Create List command', {
    'prompt': fields.String(required=True, description='template prompt'),    
})