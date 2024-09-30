import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule
import { EmpleadosService, Empleado } from '../../services/empleados.service';
import { DepartamentosService, Departamento } from '../../services/departamentos.service';

@Component({
  selector: 'app-empleado-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule], // Asegúrate de incluir ReactiveFormsModule aquí
  templateUrl: './empleado-edit.component.html',
  styleUrls: ['./empleado-edit.component.css']
})
export class EmpleadoEditComponent implements OnInit {
  empleadoForm: FormGroup;
  departamentos: Departamento[] = [];
  empleadoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private empleadosService: EmpleadosService,
    private departamentosService: DepartamentosService,
    private route: ActivatedRoute
  ) {
    this.empleadoForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      departamento_id: [''], // Asegúrate de que esto sea correcto
      cargo: [''],
      fechaContratacion: ['']
    });
  }

  ngOnInit(): void {
    this.cargarDepartamentos();
    this.route.params.subscribe(params => {
      this.empleadoId = +params['id'];
      if (this.empleadoId) {
        this.cargarEmpleado(this.empleadoId);
      }
    });
  }

  cargarDepartamentos(): void {
    this.departamentosService.getDepartamentos().subscribe((data) => {
      this.departamentos = data;
    });
  }

  cargarEmpleado(id: number): void {
    this.empleadosService.getEmpleado(id).subscribe((data) => {
      this.empleadoForm.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.empleadoForm.valid) {
      if (this.empleadoId) {
        this.empleadosService.updateEmpleado(this.empleadoId, this.empleadoForm.value).subscribe(() => {
          // Manejo post-submission (redirigir o mostrar un mensaje)
        });
      }
    }
  }
}