import { Routes } from '@angular/router';
import { EmpleadosListaComponent } from './components/empleados-lista/empleados-lista.component';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';
import { InicioComponent } from './components/inicio/inicio.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'empleados', component: EmpleadosListaComponent },
  { path: 'empleados/nuevo', component: EmpleadoFormComponent },
  { path: 'inicio', component: InicioComponent },
];
