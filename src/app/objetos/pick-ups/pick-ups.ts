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
  PickupsService
} from '../../servicios-api/api/pickups.api';

import {
  Pickup
} from '../../servicios-api/modelos_listas/pickup.model';

import {
  PickupDetalle
} from '../../servicios-api/componentes/pickup-detalle/pickup-detalle';
import { ModalComponent } from "../../servicios-api/componentes/modal/modal";

import {
  NavegacionItems
}
from '../../servicios-api/componentes/navegacion-items/navegacion-items';

@Component({
  selector: 'app-pickups',
  standalone: true,

  imports: [
    CommonModule,
    PickupDetalle,
    ModalComponent,
    NavegacionItems
],

  templateUrl: './pick-ups.html',
  styleUrls: ['./pick-ups.css']
})

export class Pickups implements OnInit {

  pickups: Pickup[] = [];

  pickupsFiltrados: Pickup[] = [];

  pickupSeleccionado:
    Pickup | null = null;

  filtroActual = 'todos';

  constructor(

    private pickupsService:
      PickupsService,

    private route:
      ActivatedRoute,

    private cdr:
      ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.pickupsService
      .obtenerPickups()
      .subscribe({

        next: (data) => {

          this.pickups =
            data.pickups;

          this.pickupsFiltrados =
            [...this.pickups];

          this.route
            .queryParams
            .subscribe(params => {

              const filtro =
                params['filtro'];

              if (filtro) {

                this.filtrarPickups(filtro);

              }

              this.cdr.detectChanges();

            });

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  seleccionarPickup(
    pickup: Pickup
  ): void {

    this.pickupSeleccionado =
      pickup;

  }

  cerrarModal(): void {

    this.pickupSeleccionado = null;

  }

  filtrarPickups(
    tipo: string
  ): void {

    this.filtroActual = tipo;

    if (tipo === 'todos') {

      this.pickupsFiltrados =
        [...this.pickups];

    }

    else if (tipo === 'inicio') {

      this.pickupsFiltrados =
        this.pickups.filter(

          p =>
            p.unlock ===
            'Disponible desde el inicio'

        );

    }

    else if (
      tipo === 'desbloqueables'
    ) {

      this.pickupsFiltrados =
        this.pickups.filter(

          p =>
            p.unlock !==
            'Disponible desde el inicio'

        );

    }

  }

  obtenerRutaIcono(
    pickup: Pickup
  ): string {

    return `assets/imagenes/consumibles/${pickup.clave}.png`;

  }

}
