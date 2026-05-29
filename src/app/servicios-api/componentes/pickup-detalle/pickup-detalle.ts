import {
  Component,
  Input
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import {
  Pickup
} from '../../modelos_listas/pickup.model';

@Component({
  selector: 'app-pickup-detalle',
  standalone: true,

  imports: [CommonModule],

  templateUrl: './pickup-detalle.html',
  styleUrls: ['./pickup-detalle.css']
})

export class PickupDetalle {

  @Input()
  pickup!: Pickup;

  obtenerRutaIcono(): string {

    return `assets/imagenes/consumibles/${this.pickup.clave}.png`;

  }

}
