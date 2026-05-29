import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ActivatedRoute,
  Router,
  RouterModule
} from '@angular/router';

import {
  EnemigosService
} from '../../servicios-api/api/enemigos.api';

import {
  Enemigo
} from '../../servicios-api/modelos_listas/enemigos.model';

import {
  ImagenesPipe
} from '../../servicios-api/pipes/imagenes-pipe';

import {
  ChangeDetectorRef
} from '@angular/core';

import {
  switchMap,
  map
} from 'rxjs';

@Component({

  selector:
    'app-enemigos-detalle',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

  templateUrl:
    './enemigos-detalle.html',

  styleUrls:
    ['./enemigos-detalle.css']

})

export class EnemigosDetalle
implements OnInit {

  enemigo?: Enemigo;

  cargando = true;

  constructor(
    private cdr:
     ChangeDetectorRef,

    private route:
      ActivatedRoute,

    private router:
      Router,

    private enemigosService:
      EnemigosService

  ) {}

ngOnInit(): void {

  this.route.paramMap

    .pipe(

      switchMap(params => {

        const id =
          params.get('id');

        this.cargando = true;

        return this
          .enemigosService
          .obtenerEnemigos()

          .pipe(

            map(data =>

              data.find(
                e => e.id === id
              )

            )

          );

      })

    )

    .subscribe({

      next: (enemigo) => {

        this.enemigo = enemigo;

        this.cargando = false;

        this.cdr.detectChanges();

        window.scrollTo(
          0,
          0
        );

      },

      error: (err) => {

        console.error(err);

        this.cargando = false;

        this.cdr.detectChanges();

      }

    });

}
  obtenerRutaImagen(): string {

    if (!this.enemigo)
      return '';

    const esBoss =

      this.enemigo.tipo
      .includes('Boss');

    return esBoss

      ? `
        assets/imagenes/enemigos/jefes/
        ${this.enemigo.id}.png
      `.replace(/\s/g, '')

      : `
        assets/imagenes/enemigos/
        ${this.enemigo.id}.png
      `.replace(/\s/g, '');

  }

  abrirVariante(
    id: string
  ): void {

    this.router.navigate([
      '/enemigos',
      id
    ]);

  }

    abrirPiso(id: string): void {
      this.router.navigate(['/pisos', id]);
    }

}