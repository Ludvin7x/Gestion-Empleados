import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';  // Si tienes un archivo de rutas

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  // Aquí proporcionamos HttpClient para toda la aplicación
    provideRouter(routes)  // Si tienes rutas, asegúrate de proporcionarlas
  ]
}).catch(err => console.error(err));