import { Routes } from '@angular/router';
import { EmpleadosListaComponent } from './components/empleados-lista/empleados-lista.component';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';

export const routes: Routes = [
  { path: 'empleados', component: EmpleadosListaComponent },
  { path: 'empleados/nuevo', component: EmpleadoFormComponent },
  { path: 'empleados/editar/:id', component: EmpleadoFormComponent },
  { path: '', redirectTo: '/empleados', pathMatch: 'full' }
];