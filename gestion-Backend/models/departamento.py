from flask import request
from flask_restx import Resource, fields
from app import departamento_ns, get_db

# Definir el modelo de datos para departamentos
departamento_model = departamento_ns.model('Departamento', {
    'id': fields.Integer(readOnly=True),
    'nombre': fields.String(required=True)
})

@departamento_ns.route('/')
class DepartamentoList(Resource):
    @departamento_ns.marshal_list_with(departamento_model)
    def get(self):
        """Obtener el listado de departamentos"""
        conn = get_db()
        cursor = conn.execute('SELECT * FROM departamentos')
        departamentos = cursor.fetchall()
        return [dict(departamento) for departamento in departamentos]

    @departamento_ns.expect(departamento_model)
    def post(self):
        """Agregar un nuevo departamento"""
        data = request.json
        conn = get_db()
        conn.execute('INSERT INTO departamentos (nombre) VALUES (?)', (data['nombre'],))
        conn.commit()
        return {'message': 'Departamento agregado correctamente'}, 201