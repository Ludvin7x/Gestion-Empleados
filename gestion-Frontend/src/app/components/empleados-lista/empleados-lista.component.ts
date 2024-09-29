import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { RouterModule } from '@angular/router';  // Solo RouterModule si lo necesitas

@Component({
  selector: 'app-empleados-lista',
  standalone: true,
  imports: [RouterModule],  // Asegúrate de que no incluyas HttpClientModule
  templateUrl: './empleados-lista.component.html',
  styleUrls: ['./empleados-lista.component.css']
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
        this.empleados = data;  
      },
      (error) => {
        console.error('Error al obtener empleados', error);
      }
    );
  }

  eliminarEmpleado(id: number): void {
    this.empleadoService.deleteEmpleado(id).subscribe(
      () => this.obtenerEmpleados(),
      (error) => console.error('Error al eliminar empleado', error)
    );
  }
}