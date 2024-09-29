import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleado-form',
  standalone: true,  // Componente independiente
  imports: [FormsModule],  // Elimina HttpClientModule, ya no lo necesitas aquí
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {
  empleado: any = {
    nombre: '',
    apellido: '',
    departamento: '',
    cargo: '',
    fechaContratacion: ''
  };
  editMode: boolean = false;
  empleadoId: number | null = null;

  constructor(
    private empleadoService: EmpleadoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.empleadoId = +id;
        this.cargarEmpleado(this.empleadoId);
      }
    });
  }

  cargarEmpleado(id: number): void {
    this.empleadoService.getEmpleado(id).subscribe(
      (data) => {
        this.empleado = data;
      },
      (error) => {
        console.error('Error al cargar empleado', error);
      }
    );
  }

  onSubmit(): void {
    if (this.editMode && this.empleadoId) {
      this.empleadoService.updateEmpleado(this.empleadoId, this.empleado).subscribe(
        () => {
          this.router.navigate(['/empleados']);
        },
        (error) => {
          console.error('Error al actualizar empleado', error);
        }
      );
    } else {
      this.empleadoService.addEmpleado(this.empleado).subscribe(
        () => {
          this.router.navigate(['/empleados']);
        },
        (error) => {
          console.error('Error al agregar empleado', error);
        }
      );
    }
  }
}