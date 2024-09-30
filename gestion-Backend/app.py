import sqlite3
from flask import Flask, request
from flask_restx import Api, Resource, Namespace
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app, version='1.0', title='API Gestión Empleados', description='Una API para gestionar empleados y departamentos')

# Definir los namespaces
empleado_ns = Namespace('empleados', description='Operaciones con empleados')
departamento_ns = Namespace('departamentos', description='Operaciones con departamentos')

# Registrar namespaces
api.add_namespace(empleado_ns, path='/api/empleados')
api.add_namespace(departamento_ns, path='/api/departamentos')

# Conectar a la base de datos
def get_db():
    try:
        conn = sqlite3.connect('empleados.db')
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.Error as e:
        print(f"Error connecting to database: {e}")
        return None

# Crear tablas si no existen
def init_db():
    with get_db() as conn:
        conn.execute('''
        CREATE TABLE IF NOT EXISTS empleados (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            apellido TEXT NOT NULL,
            departamento_id INTEGER NOT NULL,
            fecha_contratacion TEXT NOT NULL,
            nombre_cargo TEXT NOT NULL
        )
        ''')

        conn.execute('''
        CREATE TABLE IF NOT EXISTS departamentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL
        )
        ''')
        conn.commit()

# Inicializar la base de datos
init_db()

# Endpoints para empleados
@empleado_ns.route('/')
class EmpleadoList(Resource):
    def get(self):
        """Obtener todos los empleados"""
        conn = get_db()
        if conn is None:
            return {'message': 'Database connection failed'}, 500
        with conn:
            empleados = conn.execute('SELECT * FROM empleados').fetchall()
            return [dict(empleado) for empleado in empleados], 200

    def post(self):
        """Crear un nuevo empleado"""
        nuevo_empleado = request.json
        conn = get_db()
        if conn is None:
            return {'message': 'Database connection failed'}, 500
        with conn:
            cursor = conn.execute('''
                INSERT INTO empleados (nombre, apellido, departamento_id, fecha_contratacion, nombre_cargo)
                VALUES (?, ?, ?, ?, ?)
            ''', (nuevo_empleado['nombre'], nuevo_empleado['apellido'], nuevo_empleado['departamento_id'], nuevo_empleado['fecha_contratacion'], nuevo_empleado['nombre_cargo']))
            nuevo_empleado['id'] = cursor.lastrowid
            return nuevo_empleado, 201

@empleado_ns.route('/<int:id>')
class Empleado(Resource):
    def get(self, id):
        """Obtener un empleado por ID"""
        conn = get_db()
        if conn is None:
            return {'message': 'Database connection failed'}, 500
        with conn:
            empleado = conn.execute('SELECT * FROM empleados WHERE id = ?', (id,)).fetchone()
            if empleado is None:
                return {'message': 'Empleado no encontrado'}, 404
            return dict(empleado), 200

    def put(self, id):
        """Actualizar un empleado existente"""
        actualizado_empleado = request.json
        conn = get_db()
        if conn is None:
            return {'message': 'Database connection failed'}, 500
        with conn:
            conn.execute('''
                UPDATE empleados
                SET nombre = ?, apellido = ?, departamento_id = ?, fecha_contratacion = ?, nombre_cargo = ?
                WHERE id = ?
            ''', (actualizado_empleado['nombre'], actualizado_empleado['apellido'], actualizado_empleado['departamento_id'], actualizado_empleado['fecha_contratacion'], actualizado_empleado['nombre_cargo'], id))
            return {'message': 'Empleado actualizado'}, 200

    def delete(self, id):
        """Eliminar un empleado por ID"""
        conn = get_db()
        if conn is None:
            return {'message': 'Database connection failed'}, 500
        with conn:
            conn.execute('DELETE FROM empleados WHERE id = ?', (id,))
            return {'message': 'Empleado eliminado'}, 200

# Endpoints para departamentos
@departamento_ns.route('/')
class DepartamentoList(Resource):
    def get(self):
        """Obtener todos los departamentos"""
        conn = get_db()
        if conn is None:
            return {'message': 'Database connection failed'}, 500
        with conn:
            departamentos = conn.execute('SELECT * FROM departamentos').fetchall()
            return [dict(departamento) for departamento in departamentos], 200

    def post(self):
        """Crear un nuevo departamento"""
        nuevo_departamento = request.json
        conn = get_db()
        if conn is None:
            return {'message': 'Database connection failed'}, 500
        with conn:
            cursor = conn.execute('''
                INSERT INTO departamentos (nombre)
                VALUES (?)
            ''', (nuevo_departamento['nombre'],))
            nuevo_departamento['id'] = cursor.lastrowid
            return nuevo_departamento, 201

@departamento_ns.route('/<int:id>')
class Departamento(Resource):
    def get(self, id):
        """Obtener un departamento por ID"""
        conn = get_db()
        if conn is None:
            return {'message': 'Database connection failed'}, 500
        with conn:
            departamento = conn.execute('SELECT * FROM departamentos WHERE id = ?', (id,)).fetchone()
            if departamento is None:
                return {'message': 'Departamento no encontrado'}, 404
            return dict(departamento), 200

    def put(self, id):
        """Actualizar un departamento existente"""
        actualizado_departamento = request.json
        conn = get_db()
        if conn is None:
            return {'message': 'Database connection failed'}, 500
        with conn:
            conn.execute('''
                UPDATE departamentos
                SET nombre = ?
                WHERE id = ?
            ''', (actualizado_departamento['nombre'], id))
            return {'message': 'Departamento actualizado'}, 200

    def delete(self, id):
        """Eliminar un departamento por ID"""
        conn = get_db()
        if conn is None:
            return {'message': 'Database connection failed'}, 500
        with conn:
            conn.execute('DELETE FROM departamentos WHERE id = ?', (id,))
            return {'message': 'Departamento eliminado'}, 200

if __name__ == '__main__':
    app.run(debug=True)