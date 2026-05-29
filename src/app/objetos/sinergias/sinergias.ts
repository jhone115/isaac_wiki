import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import {
  SinergiasService
} from '../../servicios-api/api/sinergias.api';

import {
  ObjetosService
} from '../../servicios-api/api/objetos.api';

import {
  Sinergia
} from '../../servicios-api/modelos_listas/sinergias.model';

import {
  Objeto
} from '../../servicios-api/modelos_listas/objetos.model';

import {
  SinergiasDetalle
} from '../../servicios-api/componentes/sinergias-detalle/sinergias-detalle';

import {
  ItemDetalle
} from '../../servicios-api/componentes/itemdetalle/item-detalle';

import {
  ModalComponent
} from '../../servicios-api/componentes/modal/modal';

import {
  NavegacionItems
} from '../../servicios-api/componentes/navegacion-items/navegacion-items';

@Component({

  selector: 'app-sinergias',

  standalone: true,

  imports: [
    CommonModule,
    SinergiasDetalle,
    ItemDetalle,
    ModalComponent,
    NavegacionItems
  ],

  templateUrl: './sinergias.html',

  styleUrls: ['./sinergias.css']

})

export class Sinergias
implements OnInit {

  sinergias: Sinergia[] = [];

  objetos: Objeto[] = [];

  sinergiaSeleccionada:
    Sinergia | null = null;

  objetoSeleccionado:
    Objeto | null = null;

  constructor(

    private sinergiasService:
      SinergiasService,

    private objetosService:
      ObjetosService,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.sinergiasService
      .obtenerSinergias()
      .subscribe({

        next: (data) => {

          this.sinergias =
            data.sinergias;

          this.cdr.detectChanges();

        }

      });

    this.objetosService
      .obtenerObjetos()
      .subscribe({

        next: (data) => {

          this.objetos =
            data.objetos;

          this.cdr.detectChanges();

        }

      });

  }

  seleccionarSinergia(
    sinergia: Sinergia
  ): void {

    this.sinergiaSeleccionada =
      sinergia;

  }

  cerrarModalSinergia(): void {

    this.sinergiaSeleccionada =
      null;

  }

  cerrarModalObjeto(): void {

    this.objetoSeleccionado =
      null;

  }

  abrirObjetoDesdeSinergia(
    objeto: Objeto
  ): void {

    this.objetoSeleccionado =
      objeto;

  }

}
