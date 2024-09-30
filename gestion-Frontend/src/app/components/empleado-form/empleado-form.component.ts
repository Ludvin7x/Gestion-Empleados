import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {
  empleadoForm: FormGroup;
  departamentos: any[] = []; // Inicializar el arreglo de departamentos

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      departamento_id: ['', Validators.required],
      fecha_contratacion: ['', Validators.required],
      nombre_cargo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarDepartamentos(); // Cargar departamentos al inicializar
  }

  cargarDepartamentos(): void {
    this.http.get<any[]>('URL_DE_TU_API/departamentos') // Asegúrate de usar la URL correcta
      .subscribe(data => {
        this.departamentos = data; // Asigna los datos a la variable
      });
  }

  onSubmit(): void {
    if (this.empleadoForm.valid) {
      this.http.post('URL_DE_TU_API/empleados', this.empleadoForm.value) // Cambia a la URL de tu API
        .subscribe(response => {
          console.log('Empleado agregado:', response);
          // Aquí puedes agregar más lógica, como redireccionar o limpiar el formulario
        });
    }
  }
}
