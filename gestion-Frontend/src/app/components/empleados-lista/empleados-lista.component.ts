import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmpleadosService, Empleado } from '../../services/empleados.service';
import { DepartamentosService, Departamento } from '../../services/departamentos.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empleados-lista.component.html',
  styleUrls: ['./empleados-lista.component.css']
})
export class EmpleadosListaComponent implements OnInit {
  empleados: Empleado[] = [];
  departamentos: Departamento[] = []; 

  constructor(
    private empleadosService: EmpleadosService,
    private departamentosService: DepartamentosService 
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarDepartamentos(); 
  }

  cargarEmpleados(): void {
    this.empleadosService.getEmpleados().subscribe((data) => {
      this.empleados = data;
    });
  }

  cargarDepartamentos(): void {
    this.departamentosService.getDepartamentos().subscribe((data) => {
      this.departamentos = data; 
    });
  }

  obtenerNombreDepartamento(departamentoId: number): string {
    const departamento = this.departamentos.find(dept => dept.id === departamentoId);
    return departamento ? departamento.nombre : 'Desconocido'; 
  }

  eliminarEmpleado(id: number): void {
    if (confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
      this.empleadosService.deleteEmpleado(id).subscribe({
        next: () => {
          this.cargarEmpleados(); // Recargar la lista después de eliminar
          // Mostrar un mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'Empleado eliminado con éxito.',
          });
        },
        error: (error) => {
          console.error('Error al eliminar el empleado:', error);
          // Mostrar un mensaje de error en un diálogo de SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al eliminar el empleado: ' + error.message,
          });
        }
      });
    }
  }
}