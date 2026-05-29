import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Desbloqueo } from '../modelos_listas/desbloqueo.model';

@Injectable({
  providedIn: 'root'
})

export class DesbloqueosApi {

  constructor(
    private http: HttpClient
  ) {}

  obtenerDesbloqueos() {

    return this.http.get<Desbloqueo[]>(
      'assets/data/guias/desbloqueos.json'
    );

  }

}