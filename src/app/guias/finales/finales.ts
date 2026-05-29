import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FinalesApi
} from '../../servicios-api/api/finales.api';

import {
  Final
} from '../../servicios-api/modelos_listas/finales.model';

@Component({

  selector:
    'app-finales',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './finales.html',

  styleUrls: [
    './finales.css'
  ]

})

export class Finales
implements OnInit {

  finales:
    Final[] = [];

  finalesNormales:
    Final[] = [];

  finalesAlternos:
    Final[] = [];

  cargando:
    boolean = true;

  constructor(

    private finalesApi:
      FinalesApi

  ) {}

  ngOnInit(): void {

    this.finalesApi

      .obtenerFinales()

      .subscribe({

        next: (data) => {

          this.finales =
            data;

          this.finalesNormales =

            this.finales.filter(

              f =>
                f.tipo ===
                'normal'

            );

          this.finalesAlternos =

            this.finales.filter(

              f =>
                f.tipo ===
                'alterno'

            );

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