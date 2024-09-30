import sqlite3

def conectar():
    conn = sqlite3.connect('empleados.db')
    return conn

def insertar_departamentos():
    conn = conectar()
    cursor = conn.cursor()
    
    # Inserta algunos departamentos
    departamentos = [
        (1, 'Recursos Humanos'),
        (2, 'Informatica'),
        (3, 'Ventas'),
        (4, 'Marketing'),  # Asegúrate de que esta línea tiene una coma al final
        (5, 'Bodega')      # Y aquí también
    ]
    
    # Ejecutar la inserción en la base de datos
    cursor.executemany("INSERT INTO departamentos (id, nombre) VALUES (?, ?)", departamentos)
    
    conn.commit()
    conn.close()
    print("Departamentos insertados correctamente.")

def insertar_empleados():
    conn = conectar()
    cursor = conn.cursor()
    
    # Inserta algunos empleados
    empleados = [
        (1, 'Juan', 'Pérez', 1, '2023-01-01', 'Gerente'),  
        (2, 'María', 'Gómez', 2, '2023-01-02', 'Desarrollador'),
        (3, 'Carlos', 'Lopez', 3, '2023-01-03', 'Vendedor'),
        (4, 'Ana', 'Fernández', 4, '2023-01-04', 'Marketing Specialist')
    ]
    
    # Ejecutar la inserción en la base de datos
    cursor.executemany("INSERT INTO empleados (id, nombre, apellido, departamento_id, fecha_contratacion, nombre_cargo) VALUES (?, ?, ?, ?, ?, ?)", empleados)
    
    conn.commit()
    conn.close()
    print("Empleados insertados correctamente.")

if __name__ == '__main__':
    insertar_departamentos()
    insertar_empleados()