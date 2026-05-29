
import { Injectable } from '@angular/core';

import { HttpClient }
from '@angular/common/http';

import { Observable }
from 'rxjs';

import {
  SinergiasResponse
} from '../modelos_listas/sinergias.model';

@Injectable({
  providedIn: 'root'
})

export class SinergiasService {

  private apiUrl =
    'assets/data/objetos/sinergias.json';

  constructor(
    private http: HttpClient
  ) {}

  obtenerSinergias():
  Observable<SinergiasResponse> {

    return this.http.get<SinergiasResponse>(
      this.apiUrl
    );

  }

}
