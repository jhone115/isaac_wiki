import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import {
  Sinergia
} from '../../modelos_listas/sinergias.model';

import {
  Objeto
} from '../../modelos_listas/objetos.model';

@Component({

  selector:
    'app-sinergias-detalle',

  standalone: true,

  imports: [CommonModule],

  templateUrl:
    './sinergias-detalle.html',

  styleUrls:
    ['./sinergias-detalle.css']

})

export class SinergiasDetalle {

  @Input()

  sinergia!: Sinergia;

  @Input()

  objetos: Objeto[] = [];

  @Output()

  abrirObjeto =
    new EventEmitter<Objeto>();

obtenerObjetosSinergia():
Objeto[] {

  return this.sinergia.objetos

    .map(id =>

      this.objetos.find(
        o => o.id === id
      )

    )

    .filter(
      (objeto): objeto is Objeto =>
        objeto !== undefined
    );

}

  obtenerRutaIcono(
    objeto: Objeto
  ): string {

    return `
      assets/imagenes/objetosimg/
      collectibles_${objeto.id}_${objeto.clave}.png
    `.replace(/\s+/g, '');

  }

}
