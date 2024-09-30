import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DepartamentosService, Departamento } from '../../services/departamentos.service';
import { EmpleadosService, Empleado } from '../../services/empleados.service';

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {
  empleadoForm: FormGroup;
  departamentos: Departamento[] = [];

  constructor(
    private fb: FormBuilder,
    private departamentosService: DepartamentosService,
    private empleadosService: EmpleadosService
  ) {
    this.empleadoForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      departamento_id: [''], 
      cargo: [''],
      fechaContratacion: ['']
    });
  }

  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  cargarDepartamentos(): void {
    this.departamentosService.getDepartamentos().subscribe((data) => {
      this.departamentos = data;
    });
  }

  onSubmit(): void {
    if (this.empleadoForm.valid) {
      this.empleadosService.addEmpleado(this.empleadoForm.value).subscribe(
        (response) => {
          console.log('Empleado agregado:', response);
          // Manejo post-submission (redirigir a la lista o mostrar un mensaje de éxito)
        },
        (error) => {
          console.error('Error al agregar empleado:', error);
          // Manejar errores (por ejemplo, mostrar un mensaje de error)
        }
      );
    } else {
      console.log('Formulario no válido');
    }
}
}