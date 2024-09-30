import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService, Empleado } from '../../services/empleados.service';
import { DepartamentosService, Departamento } from '../../services/departamentos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.scss']
})
export class EmpleadoFormComponent implements OnInit {
  empleadoForm: FormGroup;
  departamentos: Departamento[] = [];
  empleadoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private empleadosService: EmpleadosService,
    private departamentosService: DepartamentosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      departamento: ['', Validators.required],
      cargo: ['', Validators.required],
      fechaContratacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.departamentosService.getDepartamentos().subscribe((data) => {
      this.departamentos = data;
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.empleadoId = +id;
        this.empleadosService.getEmpleado(this.empleadoId).subscribe((empleado) => { // Usar el método correcto
          this.empleadoForm.patchValue(empleado);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.empleadoForm.valid) {
      const empleado: Empleado = this.empleadoForm.value;
      if (this.empleadoId) {
        this.empleadosService.updateEmpleado(this.empleadoId, empleado).subscribe(() => {
          this.router.navigate(['/empleados']);
        });
      } else {
        this.empleadosService.addEmpleado(empleado).subscribe(() => {
          this.router.navigate(['/empleados']);
        });
      }
    }
  }
}