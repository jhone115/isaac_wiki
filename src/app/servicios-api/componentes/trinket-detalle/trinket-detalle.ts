import {
  Component,
  Input
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import {
  Trinket
} from '../../modelos_listas/trinkets.model';

@Component({

  selector: 'app-trinket-detalle',

  standalone: true,

  imports: [CommonModule],

  templateUrl:
    './trinket-detalle.html',

  styleUrls:
    ['./trinket-detalle.css']

})

export class TrinketDetalle {

  @Input()

  trinket!: Trinket;

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