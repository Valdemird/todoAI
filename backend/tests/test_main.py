import unittest
from flask_testing import TestCase
from main import app, db

class TestTodosAPI(TestCase):
    def create_app(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
        return app
    
    def setUp(self):
        db.create_all()
    
    def tearDown(self):
        db.session.remove()
        db.drop_all()
    
    def test_create_todo(self):
        response = self.client.post('/todos', json={"task": "Buy groceries"})
        self.assertEqual(response.status_code, 201)
    
    def test_get_all_todos(self):
        response = self.client.get('/todos')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json['todos']), 0)  # Assuming it's empty initially
    
    # Add more test cases here

if __name__ == '__main__':
    unittest.main()
