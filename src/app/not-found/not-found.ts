import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>404 - Página no encontrada</h1>
    <p>La ruta <strong>{{ url }}</strong> no existe.</p>
    <a routerLink="/">← Volver al inicio</a>
  `
})
export class NotFound {
  url = inject(Router).url;
}
