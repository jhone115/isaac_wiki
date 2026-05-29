import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ObjetosResponse } from '../modelos_listas/objetos.model';

@Injectable({
  providedIn: 'root'
})
export class ObjetosService {

  private url = '../../../assets/data/objetos/objetosData.json';

  constructor(private http: HttpClient) {}

  obtenerObjetos(): Observable<ObjetosResponse> {
    return this.http.get<ObjetosResponse>(this.url);
  }
}