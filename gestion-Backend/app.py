# app.py
from flask import Flask
from flask_restx import Api
from models.empleado import empleado_ns
from models.departamento import departamento_ns

app = Flask(__name__)
api = Api(app)

# Agregar los namespaces (endpoints)
api.add_namespace(empleado_ns, path='/api/empleados')
api.add_namespace(departamento_ns, path='/api/departamentos')

if __name__ == '__main__':
    app.run(debug=True)