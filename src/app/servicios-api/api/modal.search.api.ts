import { Injectable }
from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ModalSearchApi {

  modalAbierta =
    new BehaviorSubject<boolean>(false);

  queryActual =
    new BehaviorSubject<string>('');

  abrir(
    query: string
  ): void {

    this.queryActual.next(query);

    this.modalAbierta.next(true);

  }

  cerrar(): void {

    this.modalAbierta.next(false);

  }

}