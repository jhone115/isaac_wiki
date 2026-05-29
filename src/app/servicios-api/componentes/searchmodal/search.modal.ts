import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { Router }
from '@angular/router';

import {
  SearchApi
} from '../../api/search.api';

import {
  ModalSearchApi
} from '../../api/modal.search.api';

import {
  SearchResult
} from '../../modelos_listas/search.result';

import {
  ModalComponent
} from '../modal/modal';

@Component({
  selector: 'app-search-modal',
  standalone: true,

  imports: [CommonModule, ModalComponent],

  templateUrl: './search.modal.html',
  styleUrls: ['./search.modal.css']
})

export class SearchModal

implements OnInit {

  abierto = false;

  resultados:
    SearchResult[] = [];

  query = '';

  cargando = false;

  constructor(

    private searchApi:
      SearchApi,

    private modalApi:
      ModalSearchApi,

    private router:
      Router,
    
    private cdr:
      ChangeDetectorRef 

  ) {}

  ngOnInit(): void {

    this.modalApi
      .modalAbierta
      .subscribe(valor => {

        this.abierto = valor;

      });

    this.modalApi
      .queryActual
      .subscribe(query => {

        this.query = query;

        this.buscar();

      });

  }

  buscar(): void {

    if (!this.query.trim()) {

      this.resultados = [];

      return;

    }

    this.resultados = [];

    this.cargando = true;

    this.searchApi
      .buscar(this.query)
      .subscribe({

        next: (data) => {

          this.resultados = data;

          this.cargando = false;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(err);

          this.cargando = false;

          this.cdr.detectChanges();

        }

      });

  }

  cerrar(): void {

    this.modalApi.cerrar();

  }

  navegar(
  item: SearchResult
  ): void {

    this.router.navigate(

      [item.ruta],

      {
        queryParams:
          item.queryParams
      }

    ).then(() => {

      this.cerrar();

    });

  }

}