FROM python:3.9
WORKDIR /app
ENV FLASK_APP=main
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development
ENV SECRET_KEY_OPENAI=${SECRET_KEY_OPENAI}
COPY . .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN chmod +x entrypoint.sh
EXPOSE 50100
CMD [ "bash", "entrypoint.sh" ]
