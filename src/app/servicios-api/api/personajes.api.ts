import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { firstValueFrom } from 'rxjs';

import { Personaje } from '../modelos_listas/personaje.model';

@Injectable({
  providedIn: 'root'
})

export class PersonajesApiService {

  private personajesData:
    { [id: string]: Personaje } | null = null;

  private jsonUrl =
    'assets/data/personajes/personajes_data.json';

  constructor(
    private http: HttpClient
  ) {}

  async cargarDatos(): Promise<void> {

    if (this.personajesData) {
      return;
    }

    try {

      this.personajesData = await firstValueFrom(

        this.http.get<
          { [id: string]: Personaje }
        >(this.jsonUrl)

      );

    } catch (error) {

      console.error(
        'Error cargando personajes',
        error
      );

      this.personajesData = {};
    }
  }

  async obtenerPersonajes():
    Promise<{ [id: string]: Personaje }> {

    await this.cargarDatos();

    return this.personajesData || {};
  }

  async obtenerPersonaje(
    id: string
  ): Promise<Personaje | undefined> {

    await this.cargarDatos();

    return this.personajesData?.[id];
  }

  async obtenerLista():
    Promise<Personaje[]> {

    await this.cargarDatos();

    return Object.entries(
      this.personajesData || {}
    ).map(([id, personaje]) => ({

      ...personaje,

      id

    }));
  }
}