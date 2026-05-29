import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router,
  RouterModule,
  NavigationEnd,
  ActivatedRoute
} from '@angular/router';

import {
  filter
} from 'rxjs/operators';

import {
  EnemigosService
} from '../servicios-api/api/enemigos.api';

import {
  Enemigo
} from '../servicios-api/modelos_listas/enemigos.model';

import {
  NgZone
} from '@angular/core';

@Component({

  selector:
    'app-enemigos',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

  templateUrl:
    './enemigos.html',

  styleUrls: [
    './enemigos.css'
  ]

})

export class Enemigos
implements OnInit {

  enemigos: Enemigo[] = [];

  todosLosEnemigos:
    Enemigo[] = [];

  cargando = true;

  esVistaBosses = false;

constructor(

  private enemigosService:
    EnemigosService,

  private router:
    Router,

  private route:
    ActivatedRoute,

  private ngZone:
    NgZone

) {}

ngOnInit(): void {

  this.route.data
    .subscribe(data => {

      this.esVistaBosses =
        data['tipo'] ===
        'jefes';

      this.cargarEnemigos();

    });

}

cargarEnemigos(): void {

  this.cargando = true;

  this.enemigosService
    .obtenerEnemigos()
    .subscribe({

      next: (data) => {

        this.ngZone.run(() => {

          this.todosLosEnemigos = data;

          this.enemigos =
            data.filter(enemigo => {

              const esBoss =

                enemigo.tipo
                ?.toLowerCase()
                .includes('boss');

              return this.esVistaBosses
                ? esBoss
                : !esBoss;

            });

          this.cargando = false;

        });

      },

      error: (err) => {

        console.error(err);

        this.cargando = false;

      }

    });

}

  actualizarVista(): void {

    this.esVistaBosses =
      this.router.url.includes(
        'jefes'
      );

    this.enemigos =
      this.todosLosEnemigos
      .filter(enemigo => {

        const esBoss =

          enemigo.tipo
          ?.toLowerCase()
          .includes('boss');

        return this.esVistaBosses
          ? esBoss
          : !esBoss;

      });

  }

  abrirEnemigo(
    enemigo: Enemigo
  ): void {

    this.router.navigate([
      '/enemigos',
      enemigo.id
    ]);

  }

  obtenerRutaIcono(
    enemigo: Enemigo
  ): string {

    const esBoss =

      enemigo.tipo
      ?.toLowerCase()
      .includes('boss');

    return esBoss

      ? `assets/imagenes/enemigos/jefes/${enemigo.id}.png`

      : `assets/imagenes/enemigos/${enemigo.id}.png`;

  }

  cambiarVista(): void {

    if (this.esVistaBosses) {

      this.router.navigate([
        '/enemigos'
      ]);

    } else {

      this.router.navigate([
        '/jefes'
      ]);

    }

  }

}