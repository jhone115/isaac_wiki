import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  Piso
} from '../modelos_listas/pisos.model';

@Injectable({
  providedIn: 'root'
})

export class PisosService {

  private apiUrl =

    'assets/data/pisos/pisosData.json';

  constructor(
    private http: HttpClient
  ) {}

  obtenerPisos():
    Observable<Piso[]> {

    return this.http.get<Piso[]>(
      this.apiUrl
    );

  }

}