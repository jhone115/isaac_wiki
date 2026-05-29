import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ruta } from '../modelos_listas/rutas.model';

@Injectable({
  providedIn: 'root'
})

export class RutasApi {

  constructor(
    private http: HttpClient
  ) {}

  obtenerRutas() {

    return this.http.get<Ruta[]>(
      'assets/data/guias/rutas.json'
    );

  }

}