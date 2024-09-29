# models/departamento.py
from flask_restx import Namespace, Resource, fields
from data.departamentos_data import departamentos

departamento_ns = Namespace('departamentos', description='Operaciones relacionadas con departamentos')

departamento_model = departamento_ns.model('Departamento', {
    'codigo': fields.Integer(required=True, description='Código del departamento'),
    'nombre': fields.String(required=True, description='Nombre del departamento'),
})

@departamento_ns.route('/')
class DepartamentoList(Resource):
    @departamento_ns.marshal_list_with(departamento_model)
    def get(self):
        """Obtener el listado de departamentos"""
        return departamentos, 200

    @departamento_ns.expect(departamento_model)
    def post(self):
        """Agregar un nuevo departamento"""
        departamento = departamento_ns.payload
        departamentos.append(departamento)
        return departamento, 201
