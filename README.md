# Gestión de Empleados

Este proyecto es una aplicación para gestionar empleados y departamentos, construida con Angular para el frontend y Flask-RESTX con SQLite para el backend. La aplicación permite a los usuarios agregar, editar, eliminar y listar empleados y departamentos.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [API](#api)

## Características

- Gestión de empleados: Agregar, editar, eliminar y listar empleados.
- Gestión de departamentos: Agregar, editar, eliminar y listar departamentos.
- Interfaz de usuario intuitiva construida con Angular.
- API RESTful para la interacción con la base de datos.

## Tecnologías Utilizadas

- **Frontend**: Angular
- **Backend**: Flask-RESTX
- **Base de Datos**: SQLite
- **Control de Versiones**: Git y GitHub

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

### Backend

1. **Clona el repositorio**:
   git clone 

2. **Crea un entorno virtual (opcional pero recomendado):**
    python -m venv venv
    venv\Scripts\activate

3. **Instalar las dependencias**:
    pip install -r requisitos.txt

    **Dependencias utilizadas en caso no funcione requisitos.txt**
    Flask
    Flask-RESTx
    Flask-CORS
    
    **La base de datos ya viene incluida con algunos registros,**
    si no carga, utilizar: 
    python insertar_datos.py

4. **Ejecutar el Servidor:**
    python app.py

## FrontEnd
1. **Navega al directorio del frontend:**
cd gestion-Frontend

2. **Instala Angular CLI:**
npm install -g @angular/cli

3.**Instala las dependencias:**
npm install

4. **Ejecuta el servidor de desarrollo:**
ng serve


# Documentación de la API

## Endpoints Principales

### Empleados

- **GET** `/api/empleados`: Obtener todos los empleados.
- **POST** `/api/empleados`: Crear un nuevo empleado.
- **GET** `/api/empleados/<id>`: Obtener un empleado por ID.
- **PUT** `/api/empleados/<id>`: Actualizar un empleado por ID.
- **DELETE** `/api/empleados/<id>`: Eliminar un empleado por ID.

### Departamentos

- **GET** `/api/departamentos`: Obtener todos los departamentos.
- **POST** `/api/departamentos`: Crear un nuevo departamento.
- **GET** `/api/departamentos/<id>`: Obtener un departamento por ID.
- **PUT** `/api/departamentos/<id>`: Actualizar un departamento por ID.
- **DELETE** `/api/departamentos/<id>`: Eliminar un departamento por ID.