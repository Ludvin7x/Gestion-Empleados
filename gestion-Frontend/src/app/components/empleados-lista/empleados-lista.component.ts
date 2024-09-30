import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmpleadosService, Empleado } from '../../services/empleados.service';
import { DepartamentosService, Departamento } from '../../services/departamentos.service'; // Importar correctamente Departamento

@Component({
  selector: 'app-empleados-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empleados-lista.component.html',
  styleUrls: ['./empleados-lista.component.css']
})
export class EmpleadosListaComponent implements OnInit {
  empleados: Empleado[] = [];
  departamentos: Departamento[] = []; // Almacena departamentos

  constructor(
    private empleadosService: EmpleadosService,
    private departamentosService: DepartamentosService // Asegúrate de inyectar el servicio de departamentos
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados();
    this.cargarDepartamentos(); // Cargar departamentos al iniciar
  }

  cargarEmpleados(): void {
    this.empleadosService.getEmpleados().subscribe((data) => {
      this.empleados = data;
    });
  }

  cargarDepartamentos(): void {
    this.departamentosService.getDepartamentos().subscribe((data) => { // Cambia a usar DepartamentosService
      this.departamentos = data; // Almacena la lista de departamentos
    });
  }

  obtenerNombreDepartamento(departamentoId: number): string {
    const departamento = this.departamentos.find(dept => dept.id === departamentoId);
    return departamento ? departamento.nombre : 'Desconocido'; // Devuelve el nombre o 'Desconocido' si no se encuentra
  }

  eliminarEmpleado(id: number): void {
    this.empleadosService.deleteEmpleado(id).subscribe(() => {
      this.cargarEmpleados(); // Recargar la lista después de eliminar
    });
  }
}

