import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjetosService } from '../servicios-api/api/objetos.api';

import {
  Objeto
} from '../servicios-api/modelos_listas/objetos.model';

import { ItemDetalle }
from '../servicios-api/componentes/itemdetalle/item-detalle';
import { ActivatedRoute } from '@angular/router';

import {
  NavegacionItems
}
from '../servicios-api/componentes/navegacion-items/navegacion-items';

@Component({
  selector: 'app-objetos',
  standalone: true,

  imports: [
    CommonModule,
    ItemDetalle,
    NavegacionItems
  ],

  templateUrl: './objetos.html',
  styleUrls: ['./objetos.css']
})

export class Objetos implements OnInit {

  objetos: Objeto[] = [];

  objetoSeleccionado: Objeto | null = null;

  objetosFiltrado: Objeto[] = [];

  filtroActual: string = 'todos';


  

constructor(

  private objetosService:
    ObjetosService,

  private route:
    ActivatedRoute,
  
  private cdr:
    ChangeDetectorRef

) {}

ngOnInit(): void {

  this.objetosService
    .obtenerObjetos()
    .subscribe({

      next: (data) => {

        this.objetos =
          data.objetos;
        
        this.objetosFiltrado = [...this.objetos];

this.route
  .queryParams
  .subscribe(params => {

    const id =
      Number(params['id']);

    const filtro =
      params['filtro'];

    if (filtro) {

      this.filtrarObjetos(filtro);

    }

    if (id) {

      const objetoEncontrado =
        this.objetos.find(
          o => o.id === id
        );

      if (objetoEncontrado) {

        this.objetoSeleccionado =
          objetoEncontrado;

      }

    }

    this.cdr.detectChanges();

  });

      },

      error: (err) => {

        console.error(err);

      }

    });

}

  seleccionarObjeto(objeto: Objeto): void {

    console.log('CLICK FUNCIONA');

    console.log(objeto);

    this.objetoSeleccionado = objeto;

  }

  cerrarModal(): void {

    this.objetoSeleccionado = null;

  }

  obtenerRutaIcono(objeto: Objeto): string {

    return `assets/imagenes/objetosimg/collectibles_${objeto.id}_${objeto.clave}.png`;

  }

  filtrarObjetos(tipo: string): void {

    this.filtroActual = tipo;

    if (tipo === 'todos') {

      this.objetosFiltrado = [...this.objetos];

    } else if (tipo === 'inicio') {

      this.objetosFiltrado = this.objetos.filter(
        obj => obj.unlock === 'Disponible desde el inicio'
      );
      
    } else if (tipo === 'desbloqueables') {
      this.objetosFiltrado = this.objetos.filter(
        obj => obj.unlock !== 'Disponible desde el inicio'
      );
    }

  }
      
}