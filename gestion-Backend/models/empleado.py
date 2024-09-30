from flask import request
from flask_restx import Resource, fields
from app import empleado_ns, get_db

# Definir el modelo de datos para empleados
empleado_model = empleado_ns.model('Empleado', {
    'id': fields.Integer(readOnly=True),
    'nombre': fields.String(required=True),
    'apellido': fields.String(required=True),
    'departamento_id': fields.Integer(required=True),
    'fecha_contratacion': fields.String(required=True),
    'nombre_cargo': fields.String(required=True)
})

@empleado_ns.route('/')
class EmpleadoList(Resource):
    @empleado_ns.marshal_list_with(empleado_model)
    def get(self):
        """Obtener el listado de empleados"""
        conn = get_db()
        cursor = conn.execute('SELECT * FROM empleados')
        empleados = cursor.fetchall()
        return [dict(empleado) for empleado in empleados]

    @empleado_ns.expect(empleado_model)
    def post(self):
        """Agregar un nuevo empleado"""
        data = request.json
        conn = get_db()
        conn.execute('''INSERT INTO empleados (nombre, apellido, departamento_id, fecha_contratacion, nombre_cargo)
                        VALUES (?, ?, ?, ?, ?)''', 
                     (data['nombre'], data['apellido'], data['departamento_id'], 
                      data['fecha_contratacion'], data['nombre_cargo']))
        conn.commit()
        return {'message': 'Empleado agregado correctamente'}, 201

@empleado_ns.route('/<int:id>')
class EmpleadoResource(Resource):
    @empleado_ns.marshal_with(empleado_model)
    def get(self, id):
        """Obtener un empleado por ID"""
        conn = get_db()
        cursor = conn.execute('SELECT * FROM empleados WHERE id = ?', (id,))
        empleado = cursor.fetchone()
        if empleado is None:
            empleado_ns.abort(404, "Empleado no encontrado")
        return dict(empleado)

    @empleado_ns.expect(empleado_model)
    def put(self, id):
        """Editar un empleado existente"""
        data = request.json
        conn = get_db()
        conn.execute('''UPDATE empleados
                        SET nombre = ?, apellido = ?, departamento_id = ?, fecha_contratacion = ?, nombre_cargo = ?
                        WHERE id = ?''',
                     (data['nombre'], data['apellido'], data['departamento_id'], 
                      data['fecha_contratacion'], data['nombre_cargo'], id))
        conn.commit()
        return {'message': 'Empleado actualizado correctamente'}

    def delete(self, id):
        """Eliminar un empleado por ID"""
        conn = get_db()
        conn.execute('DELETE FROM empleados WHERE id = ?', (id,))
        conn.commit()
        return {'message': 'Empleado eliminado correctamente'}, 204