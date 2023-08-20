FROM python:3.9
WORKDIR /app
ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development
COPY . .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 50100
CMD [ "python3", "main.py"]
