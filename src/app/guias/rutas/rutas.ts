import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router
} from '@angular/router';

import {
  RutasApi
} from '../../servicios-api/api/rutas.api';

import {
  Ruta
} from '../../servicios-api/modelos_listas/rutas.model';

@Component({

  selector:
    'app-rutas',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './rutas.html',

  styleUrls: [
    './rutas.css'
  ]

})

export class Rutas
implements OnInit {

  rutas:
    Ruta[] = [];

  cargando:
    boolean = true;

  constructor(

    private rutasApi:
      RutasApi,

    private router:
      Router

  ) {}

  ngOnInit(): void {

    this.rutasApi

      .obtenerRutas()

      .subscribe({

        next: (data) => {

          this.rutas =
            data;

          this.cargando =
            false;

        },

        error: () => {

          this.cargando =
            false;

        }

      });

  }

  abrirRuta(
    ruta: Ruta
  ): void {

    console.log(
      ruta
    );
  }

}