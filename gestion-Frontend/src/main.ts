import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';  // Asegúrate de que esta línea esté presente
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';  // Importa las rutas

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  // Provee HttpClient a nivel de aplicación
    provideRouter(routes)  // Provee las rutas
  ]
}).catch(err => console.error(err));