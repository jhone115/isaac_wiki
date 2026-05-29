import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  map
} from 'rxjs';

import {
  Enemigo,
  EnemigosResponse
} from '../modelos_listas/enemigos.model';

@Injectable({
  providedIn: 'root'
})

export class EnemigosService {

  private url =
    'assets/data/enemigos/enemigosData.json';

  constructor(
    private http: HttpClient
  ) {}

  obtenerEnemigos():
  Observable<Enemigo[]> {

    return this.http
      .get<EnemigosResponse>(
        this.url
      )
      .pipe(

        map(data => [

          ...data.enemigos,
          ...data.bosses

        ])

      );

  }

}