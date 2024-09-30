import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DepartamentosService, Departamento } from '../../services/departamentos.service';
import { EmpleadosService, Empleado } from '../../services/empleados.service';

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule], // Importa ReactiveFormsModule aquí
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
      departamento: [''],
      cargo: [''],
      fechaContratacion: ['']
    });
  }

  ngOnInit(): void {
    this.cargarDepartamentos(); // Cargar los departamentos al iniciar
  }

  cargarDepartamentos(): void {
    this.departamentosService.getDepartamentos().subscribe((data) => {
      this.departamentos = data; // Almacena la lista de departamentos
    });
  }

  onSubmit(): void {
    if (this.empleadoForm.valid) {
      // Lógica para guardar el empleado
      this.empleadosService.addEmpleado(this.empleadoForm.value).subscribe(() => {
        // Manejo post-submission
      });
    }
  }
}