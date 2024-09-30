from app import app, db

# Inicializa la base de datos
with app.app_context():
    db.create_all()
    print("Base de datos creada con éxito.")