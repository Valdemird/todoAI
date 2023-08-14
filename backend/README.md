# Crear la base de datos:

1. Instalar la DB con docker compose:

en el folder backend corre el siguiente comando

     docker-compose up


2. Definir la variable de entorno `FLASK_APP`:

   - En sistemas Unix/Linux/macOS:
     ```bash
     export FLASK_APP=main
     ```
   - En sistemas Windows (en CMD):
     ```bash
     set FLASK_APP=main
     ```

3. Ejecutar el shell de Flask:

   ```bash
   flask shell
   ```

4. Importar y ejecutar el script de migración:

   ```python
   from models import Task
   from config import db
   db.create_all()
   ```

   Si deseas realizar cambios, puedes borrar todas las tablas y ejecutar nuevamente:

   ```python
   db.drop_all()
   db.create_all()
   ```

   Sin embargo, esta acción borrará todas las tablas. Por eso, es recomendable trabajar con Flask-Migrate para migraciones más controladas. Puedes encontrar información en [este enlace](https://flask-migrate.readthedocs.io/en/latest/index.html).

5. Instalar Flask-Migrate y ejecutar los comandos:

   - Instala Flask-Migrate:

     ```bash
     pip install Flask-Migrate
     ```

   - Inicializa las migraciones:

     ```bash
     flask db init
     ```

   - Crea una nueva migración (esto generará un archivo con instrucciones SQL para aplicar los cambios):

     ```bash
     flask db migrate -m "Migración inicial."
     ```

   - Ejecuta la migración en la base de datos:
     ```bash
     flask db upgrade
     ```

Librerías necesarias:

- Instala las siguientes librerías:
  ```bash
  pip install Flask-Migrate
  pip install flask_marshmallow
  pip install marshmallow-sqlalchemy
  pip install Flask-CORS
  pip install psycopg2-binary
  ```

  tambien puedes instalar todas las dependencias corriendo:
  ```bash
   pip install -r requirements.txt
  ```

