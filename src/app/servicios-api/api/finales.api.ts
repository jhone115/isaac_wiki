import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Final } from '../modelos_listas/finales.model';

@Injectable({
  providedIn: 'root'
})

export class FinalesApi {

  constructor(
    private http: HttpClient
  ) {}

  obtenerFinales() {

    return this.http.get<Final[]>(
      'assets/data/guias/finales.json'
    );

  }

}