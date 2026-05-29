import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Objeto }
from '../../modelos_listas/objetos.model';

@Component({
  selector: 'app-item-detalle',
  standalone: true,

  imports: [CommonModule],

  templateUrl: './item-detalle.html',
  styleUrls: ['./item-detalle.css']
})

export class ItemDetalle {

  @Input() objeto!: Objeto;

  obtenerRutaIcono(objeto: Objeto): string {

    return `assets/imagenes/objetosimg/collectibles_${objeto.id}_${objeto.clave}.png`;

  }

}