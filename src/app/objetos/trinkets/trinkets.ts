import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import {
  ActivatedRoute
} from '@angular/router';

import {
  TrinketsService
} from '../../servicios-api/api/trinkets.api';

import {
  Trinket
} from '../../servicios-api/modelos_listas/trinkets.model';

import {
  TrinketDetalle
} from '../../servicios-api/componentes/trinket-detalle/trinket-detalle';

import {
  ModalComponent
} from '../../servicios-api/componentes/modal/modal';

import {
  NavegacionItems
} from '../../servicios-api/componentes/navegacion-items/navegacion-items';

@Component({

  selector: 'app-trinkets',

  standalone: true,

  imports: [
    CommonModule,
    TrinketDetalle,
    ModalComponent,
    NavegacionItems
  ],

  templateUrl: './trinkets.html',

  styleUrls: ['./trinkets.css']

})

export class Trinkets
implements OnInit {

  trinkets: Trinket[] = [];

  trinketsFiltrados:
    Trinket[] = [];

  trinketSeleccionado:
    Trinket | null = null;

  filtroActual = 'todos';

  constructor(

    private trinketsService:
      TrinketsService,

    private route:
      ActivatedRoute,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.trinketsService
      .obtenerTrinkets()
      .subscribe({

        next: (data) => {

          this.trinkets =
            data.trinkets;

          this.trinketsFiltrados =
            [...this.trinkets];

          this.route
            .queryParams
            .subscribe(params => {

              const filtro =
                params['filtro'];

              if (filtro) {

                this.filtrarTrinkets(
                  filtro
                );

              }

              this.cdr.detectChanges();

            });

        }

      });

  }

  seleccionarTrinket(
    trinket: Trinket
  ): void {

    this.trinketSeleccionado =
      trinket;

  }

  cerrarModal(): void {

    this.trinketSeleccionado =
      null;

  }

  filtrarTrinkets(
    tipo: string
  ): void {

    this.filtroActual = tipo;

    if (tipo === 'todos') {

      this.trinketsFiltrados =
        [...this.trinkets];

    }

    else if (tipo === 'inicio') {

      this.trinketsFiltrados =
        this.trinkets.filter(

          t =>
            t.unlock ===
            'Disponible desde el inicio'

        );

    }

    else if (
      tipo === 'desbloqueables'
    ) {

      this.trinketsFiltrados =
        this.trinkets.filter(

          t =>
            t.unlock !==
            'Disponible desde el inicio'

        );

    }

  }

  obtenerRutaIcono(
    trinket: Trinket
  ): string {

    const idFormateado =
      trinket.id
        .toString()
        .padStart(3, '0');

    return `
      assets/imagenes/trinkets/
      trinket_${idFormateado}_${trinket.clave}.png
    `.replace(/\s+/g, '');

  }

}