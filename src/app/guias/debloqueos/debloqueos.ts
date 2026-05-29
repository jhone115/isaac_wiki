import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  DesbloqueosApi
} from '../../servicios-api/api/desbloqueos.api';

import {
  Desbloqueo
} from '../../servicios-api/modelos_listas/desbloqueo.model';

@Component({

  selector:
    'app-desbloqueos',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './debloqueos.html',

  styleUrls: [
    './debloqueos.css'
  ]

})

export class Desbloqueos
implements OnInit {

  desbloqueos:
    Desbloqueo[] = [];

  cargando:
    boolean = true;

  constructor(

    private desbloqueosApi:
      DesbloqueosApi

  ) {}

  ngOnInit(): void {

    this.desbloqueosApi

      .obtenerDesbloqueos()

      .subscribe({

        next: (data) => {

          this.desbloqueos =
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

}