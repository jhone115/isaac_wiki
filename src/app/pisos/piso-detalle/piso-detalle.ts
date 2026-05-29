import {
  Component,
  OnInit,
  inject,
  PLATFORM_ID
} from '@angular/core';

import {
  ActivatedRoute,
  Router,
  RouterModule
} from '@angular/router';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import {
  PisosService
} from '../../servicios-api/api/pisos.api';

@Component({

  selector:
    'app-piso-detalle',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

  templateUrl:
    './piso-detalle.html',

  styleUrls: [
    './piso-detalle.css'
  ]

})

export class PisoDetalle
implements OnInit {

  piso: any;

  private platformId =
    inject(PLATFORM_ID);

  constructor(

    private route:
      ActivatedRoute,

    private pisosService:
      PisosService,

    private router:
      Router

  ) {}

  ngOnInit(): void {

    this.route.paramMap
      .subscribe(params => {

        const id =
          params.get('id');

        this.pisosService
          .obtenerPisos()
          .subscribe(data => {

            this.piso =

              data.find(
                p => p.id === id
              );

            if (
              this.piso &&
              isPlatformBrowser(
                this.platformId
              )
            ) {

              document.body.style
              .backgroundImage =

                `url(${this.piso.fondo})`;

              document.body.style
              .backgroundSize =
                'cover';

              document.body.style
              .backgroundPosition =
                'center';

              document.body.style
              .backgroundAttachment =
                'fixed';

            }

          });

      });

  }

  abrirEnemigo(
    id: string
  ): void {

    this.router.navigate([
      '/enemigos',
      id
    ]);

  }

}