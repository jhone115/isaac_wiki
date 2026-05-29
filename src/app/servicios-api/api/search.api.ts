import { Injectable }
from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  forkJoin,
  map
} from 'rxjs';

import {
  SearchResult
} from '../modelos_listas/search.result';

@Injectable({
  providedIn: 'root'
})

export class SearchApi {

  constructor(
    private http: HttpClient
  ) {}

  buscar(
  query: string
): Observable<SearchResult[]> {

  return forkJoin({

    objetos:
      this.http.get<any>(
        'assets/data/objetos/objetosData.json'
      ),

    personajes:
      this.http.get<any>(
        'assets/data/personajes/personajes_data.json'
      ),

    pisos:
      this.http.get<any>(
        'assets/data/pisos/pisosData.json'
      )

  }).pipe(

    map(data => {

      const resultados:
        SearchResult[] = [];

      /* OBJETOS */

      for (
        const objeto
        of data.objetos.objetos
      ) {

        const item: SearchResult = {

          id:
            String(objeto.id),

          nombre:
            objeto.nombre,

          descripcion:
            objeto.descripcion,

          tipo:
            objeto.tipo,

          imagen:
            `assets/imagenes/objetosimg/collectibles_${objeto.id}_${objeto.clave}.png`,

          categoria:
            'objeto',

          ruta:
            '/objetos',

            queryParams: {
              id: objeto.id
            }

        };

        if (
          this.coincide(
            item,
            query
          )
        ) {

          resultados.push(item);

        }

      }

      /* PERSONAJES */

      for (
        const [key, personaje]
        of Object.entries<any>(
          data.personajes
        )
      ) {

        const item: SearchResult = {

          id: key,

          nombre:
            personaje.nombre,

          descripcion:
            personaje.descripcioncorta,

          imagen:
            `assets/${personaje.imagen}`,

          categoria:
            'personaje',

          ruta:
            `/personaje?id=${key}`

        };

        if (
          this.coincide(
            item,
            query
          )
        ) {

          resultados.push(item);

        }

      }

/* PISOS */

if (
  data.pisos?.informacionPisos
) {

  for (
    const [key, piso]
    of Object.entries<any>(
      data.pisos.informacionPisos
    )
  ) {

    const item: SearchResult = {

      id: key,

      nombre:
        piso.nombre,

      descripcion:
        piso.descripcion,

      imagen:
        data.pisos.fondosPisos[key]
          ?.replace('../', 'assets/data/'),

      categoria:
        'piso',

      ruta:
        `/pisos?id=${key}`

    };

    if (
      this.coincide(
        item,
        query
      )
    ) {

      resultados.push(item);

    }

  }

}
      return resultados;

    })

  );

}

  coincide(
    item: SearchResult,
    query: string
  ): boolean {

    const q =
      query.toLowerCase();

    return [

      item.nombre,
      item.descripcion,
      item.tipo || ''

    ].some(texto =>

      texto
        .toLowerCase()
        .includes(q)

    );

  }

}