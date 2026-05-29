import { Injectable } from '@angular/core';

import { HttpClient }
from '@angular/common/http';

import { Observable }
from 'rxjs';

import {
  PickupsResponse
} from '../modelos_listas/pickup.model';

@Injectable({
  providedIn: 'root'
})

export class PickupsService {

  private apiUrl =
    'assets/data/objetos/pickupsData.json';

  constructor(
    private http: HttpClient
  ) {}

  obtenerPickups(): Observable<PickupsResponse> {

    return this.http.get<PickupsResponse>(
      this.apiUrl
    );

  }

}