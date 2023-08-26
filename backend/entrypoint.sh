#!/bin/bash
echo "Starting backend"
flask db init
flask db migrate
flask db upgrade
python main.py
