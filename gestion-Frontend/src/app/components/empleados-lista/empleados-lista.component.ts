import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';  // Asegúrate de que la ruta sea correcta
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-empleados-lista',
  standalone: true,  // Componente independiente
  imports: [RouterModule],  // Si usas RouterModule para enlaces
  templateUrl: './empleados-lista.component.html',  // Asegúrate de que este archivo exista
  styleUrls: ['./empleados-lista.component.css']  // Asegúrate de que este archivo exista
})
export class EmpleadosListaComponent implements OnInit {
  empleados: any[] = [];

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  obtenerEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(
      (data) => {
        this.empleados = data;  // Almacena la lista de empleados
      },
      (error) => {
        console.error('Error al obtener empleados', error);
      }
    );
  }

  eliminarEmpleado(id: number): void {
    this.empleadoService.deleteEmpleado(id).subscribe(
      () => this.obtenerEmpleados(),  // Actualiza la lista después de eliminar
      (error) => console.error('Error al eliminar empleado', error)
    );
  }
}