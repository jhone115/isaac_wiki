import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { firstValueFrom } from 'rxjs';

import { PersonajesApiService }
from '../../servicios-api/api/personajes.api';

import {
  Personaje as PersonajeModel
} from '../../servicios-api/modelos_listas/personaje.model';

@Component({
  selector: 'app-personaje',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personaje.html',
  styleUrl: './personaje.css',
})
export class Personaje implements OnInit {

  personaje?: PersonajeModel;

  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private personajesApi: PersonajesApiService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {

    const params =
      await firstValueFrom(this.route.queryParams);

    const id = params['id'];

    if (id) {

      this.personaje =
        await this.personajesApi.obtenerPersonaje(id);

      document.title =
        `${this.personaje?.nombre} | The Isaac Wiki`;
    }

    this.cargando = false;

    this.cdr.detectChanges();
  }

  getImagenes(imagen: string | string[]) {

    return Array.isArray(imagen)
      ? imagen
      : [imagen];
  }

  generarCorazones(vida: any[]) {

    let corazones: string[] = [];

    vida.forEach(obj => {

      for (let i = 0; i < obj.cantidad; i++) {

        corazones.push(
          `assets/imagenes/consumibles/corazon ${obj.tipo}.png`
        );
      }
    });

    return corazones;
  }

  generarConsumibles(consumibles: any[]) {

    let lista: string[] = [];

    consumibles?.forEach(c => {

      for (let i = 0; i < c.cantidad; i++) {

        lista.push(
          `assets/imagenes/consumibles/${c.tipo}.png`
        );
      }
    });

    return lista;
  }
}