import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router,
  RouterModule
} from '@angular/router';

import {
  PisosService
} from '../servicios-api/api/pisos.api';

import {
  Piso
} from '../servicios-api/modelos_listas/pisos.model';

@Component({

  selector: 'app-pisos',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

  templateUrl: './pisos.html',

  styleUrls: [
    './pisos.css'
  ]

})

export class Pisos
implements OnInit, OnDestroy {

  pisos: Piso[] = [];

  cargando = true;

  pisoActualIndex = 0;

  intervaloFondo: any;

  constructor(

    private pisosService:
      PisosService,

    private router:
      Router

  ) {}

  ngOnInit(): void {

    this.cargarPisos();

  }

  ngOnDestroy(): void {

    clearInterval(
      this.intervaloFondo
    );

  }

  cargarPisos(): void {

    this.cargando = true;

    this.pisosService
      .obtenerPisos()
      .subscribe({

        next: (data) => {

          this.pisos = data;

          this.cargando = false;

          this.iniciarCambioAutomatico();

        },

        error: (err) => {

          console.error(err);

          this.cargando = false;

        }

      });

  }

  iniciarCambioAutomatico(): void {

    this.intervaloFondo =
      setInterval(() => {

        this.cambiarPisoAleatorio();

      }, 5000);

  }

  cambiarPisoAleatorio(): void {

    if (
      this.pisos.length <= 1
    ) return;

    let nuevoIndex =
      Math.floor(
        Math.random() *
        this.pisos.length
      );

    while (
      nuevoIndex ===
      this.pisoActualIndex
    ) {

      nuevoIndex =
        Math.floor(
          Math.random() *
          this.pisos.length
        );

    }

    this.pisoActualIndex =
      nuevoIndex;

  }

  obtenerPisoActual():
    Piso | undefined {

    return this.pisos[
      this.pisoActualIndex
    ];

  }

  obtenerRutaImagen(
    piso: Piso
  ): string {

    return `assets/imagenes/pisos/${piso.id}.png`;

  }

  abrirPiso(
    piso: Piso
  ): void {

    this.router.navigate([
      '/pisos',
      piso.id
    ]);

  }

}