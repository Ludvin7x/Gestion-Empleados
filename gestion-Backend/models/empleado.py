# models/empleado.py
from flask_restx import Namespace, Resource, fields
from data.empleados_data import empleados

empleado_ns = Namespace('empleados', description='Operaciones relacionadas con empleados')

empleado_model = empleado_ns.model('Empleado', {
    'codigo': fields.Integer(required=True, description='Código del empleado'),
    'nombre': fields.String(required=True, description='Nombre del empleado'),
    'apellido': fields.String(required=True, description='Apellido del empleado'),
    'departamento_codigo': fields.Integer(required=True, description='Código del departamento'),
    'fecha_contratacion': fields.String(required=True, description='Fecha de contratación'),
    'cargo': fields.String(required=True, description='Nombre del cargo'),
})

@empleado_ns.route('/')
class EmpleadoList(Resource):
    @empleado_ns.marshal_list_with(empleado_model)
    def get(self):
        """Obtener el listado de empleados"""
        return empleados, 200

    @empleado_ns.expect(empleado_model)
    def post(self):
        """Agregar un nuevo empleado"""
        empleado = empleado_ns.payload
        empleados.append(empleado)
        return empleado, 201

@empleado_ns.route('/<int:código>')
class Empleado(Resource):
    @empleado_ns.marshal_with(empleado_model)
    def get(self, código):
        """Obtener un empleado existente"""
        empleado = next((e for e in empleados if e['codigo'] == código), None)
        if empleado is not None:
            return empleado, 200
        return {'message': 'Empleado no encontrado'}, 404

    @empleado_ns.expect(empleado_model)
    def put(self, código):
        """Editar un empleado existente"""
        empleado_actualizado = empleado_ns.payload
        for empleado in empleados:
            if empleado['codigo'] == código:
                empleado.update(empleado_actualizado)
                return empleado, 200
        return {'message': 'Empleado no encontrado'}, 404

    def delete(self, código):
        """Eliminar un empleado"""
        global empleados
        empleados = [e for e in empleados if e['codigo'] != código]
        return {'message': 'Empleado eliminado'}, 204
