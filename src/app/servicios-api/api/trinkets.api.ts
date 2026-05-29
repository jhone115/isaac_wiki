import { Injectable } from '@angular/core';

import { HttpClient }
from '@angular/common/http';

import { Observable }
from 'rxjs';

import {
  TrinketsResponse
} from '../modelos_listas/trinkets.model';

@Injectable({
  providedIn: 'root'
})

export class TrinketsService {

  private apiUrl =
    'assets/data/objetos/trinkets.json';

  constructor(
    private http: HttpClient
  ) {}

  obtenerTrinkets():
  Observable<TrinketsResponse> {

    return this.http.get<TrinketsResponse>(
      this.apiUrl
    );

  }

}