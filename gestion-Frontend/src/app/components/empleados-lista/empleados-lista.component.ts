import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmpleadosService, Empleado } from '../../services/empleados.service';

@Component({
  selector: 'app-empleados-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empleados-lista.component.html',
  styleUrls: ['./empleados-lista.component.scss']
})
export class EmpleadosListaComponent implements OnInit {
  empleados: Empleado[] = [];

  constructor(private empleadosService: EmpleadosService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadosService.getEmpleados().subscribe((data) => {
      this.empleados = data;
    });
  }

  eliminarEmpleado(id: number): void {
    this.empleadosService.deleteEmpleado(id).subscribe(() => {
      this.cargarEmpleados(); // Recargar la lista después de eliminar
    });
  }
}

