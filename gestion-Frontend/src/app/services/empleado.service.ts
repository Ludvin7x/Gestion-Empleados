import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Asegúrate de que esto esté presente
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmpleadoService {
  private apiUrl = 'http://localhost:5000/api';  // URL del backend

  constructor(private http: HttpClient) { }

  // Obtener lista de empleados
  getEmpleados(): Observable<any> {
    return this.http.get(`${this.apiUrl}/empleados`);
  }

  //Obtener listado de departamentos 
  getDepartamentos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/departamentos`);
  }

  // Obtener un solo empleado por su ID
  getEmpleado(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/empleados/${id}`);
  }

  // Agregar un nuevo empleado
  addEmpleado(empleado: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/empleados`, empleado);
  }

  // Editar un empleado
  updateEmpleado(id: number, empleado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/empleados/${id}`, empleado);
  }

  // Eliminar un empleado
  deleteEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/empleados/${id}`);
  }
}