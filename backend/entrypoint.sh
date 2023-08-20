#!/bin/bash
echo "Starting backend"
flask db migrate
flask db upgrade
python main.py
