import { Component } from '@angular/core';
import { Ruleta } from '../ruleta/ruleta';
import { Router, RouterModule  } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ModalComponent} from '../servicios-api/componentes/modal/modal';

interface MenuSection {
  id: string;
  label: string;
  paperImage: string;
  contentImage: string;
  route?: string;
}

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [Ruleta, CommonModule, RouterModule, ModalComponent],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {
  constructor(private router: Router) {}

  sections: MenuSection[] = [
    { id: 'personajes', label: 'personajes', paperImage: 'assets/paper-m.png', contentImage: 'assets/icons/isaac.png', route: '/personajes' },
    { id: 'objetos', label: 'objetos', paperImage: 'assets/paper-m.png', contentImage: 'assets/icons/mushroom.png', route: '/objetos' },
    { id: 'desbloqueables', label: 'base desbloqueables', paperImage: 'assets/paper-m.png', contentImage: 'assets/icons/skull.png', route: '/desbloqueables' },
    { id: 'pickups', label: 'pick ups', paperImage: 'assets/paper-m.png', contentImage: 'assets/icons/gems.png', route: '/pickups' },
    { id: 'trinkets', label: 'trinkets', paperImage: 'assets/paper-m.png', contentImage: 'assets/icons/trinket.png', route: '/trinkets' },
    { id: 'sinergias', label: 'sinergias', paperImage: 'assets/paper-m.png', contentImage: 'assets/icons/cat.png', route: '/sinergias' },
    { id: 'jefes', label: 'jefes', paperImage: 'assets/paper-m.png', contentImage: 'assets/icons/boss.png', route: '/jefes' },
    { id: 'enemigos', label: 'enemigos', paperImage: 'assets/paper-m.png', contentImage: 'assets/icons/enemy.png', route: '/enemigos' },
    //{ id: 'especiales', label: 'especiales', paperImage: 'assets/paper-m.png', contentImage: 'assets/icons/special.png', route: '/especiales' },
    { id: 'pisos', label: 'pisos', paperImage: 'assets/paper-m.png', contentImage: 'assets/icons/crown.png', route: '/pisos' },
    { id: 'rutas', label: 'rutas', paperImage: 'assets/paper-m.png', contentImage: 'assets/icons/red-door.png', route: '/rutas' },
    { id: 'normales', label: 'normales', paperImage: 'assets/paper-m.png', contentImage: 'assets/icons/trophy.png', route: '/normales' },
    { id: 'alternos', label: 'alternos', paperImage: 'assets/paper-m.png', contentImage: 'assets/icons/alt-boss.png', route: '/alternos' },
    { id: 'guias', label: 'guias', paperImage: 'assets/paper-m.png', contentImage: 'assets/icons/map.png', route: '/guias' },
    { id: 'finales', label: 'finales', paperImage: 'assets/paper-m.png', contentImage: 'assets/icons/chest.png', route: '/finales' },
  ];

  mostrarModalDesbloqueables = false;

navigateTo(section: MenuSection): void {

  if (section.id === 'desbloqueables') {

    this.mostrarModalDesbloqueables = true;

    return;

  }

  if (section.route) {

    this.router.navigateByUrl(section.route);

  }

}

abrirObjetos(tipo: string): void {

  this.mostrarModalDesbloqueables = false;

  this.router.navigate(

    ['/objetos'],

    {

      queryParams: {

        filtro: tipo

      }

    }

  );

}

cerrarModal(): void {

  this.mostrarModalDesbloqueables = false;

}
}