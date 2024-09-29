import { Routes } from '@angular/router';
import { EmpleadosListaComponent } from './components/empleados-lista/empleados-lista.component';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';

export const routes: Routes = [
  { path: 'empleados', component: EmpleadosListaComponent },
  { path: 'empleado/nuevo', component: EmpleadoFormComponent },
  { path: 'empleado/editar/:id', component: EmpleadoFormComponent },
  { path: '', redirectTo: '/empleados', pathMatch: 'full' },
  { path: '**', redirectTo: '/empleados' }
];