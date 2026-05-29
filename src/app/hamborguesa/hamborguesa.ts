import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hamborguesa',
  standalone: true,
  imports: [CommonModule, RouterModule],

  template: `

<div class="barra-lateral">

  <!-- Botón hamburguesa -->
  <button
    class="hamburguesa"
    [class.active]="menuAbierto"
    (click)="toggleMenu()"
    aria-label="Abrir menú">

    <span></span>
    <span></span>
    <span></span>

  </button>

</div>

<!-- Overlay -->
<div
  class="overlay"
  [class.active]="menuAbierto"
  (click)="toggleMenu()">
</div>

<!-- Menú lateral -->
<nav class="menu-lateral" [class.active]="menuAbierto">

  <ul>

    <li *ngFor="let item of menuItems">

      <!-- Ruta normal -->
      <a
        *ngIf="!esRutaActual(item.route)"
        [routerLink]="item.route"
        (click)="toggleMenu()">

        {{ item.label }}

      </a>

      <!-- Si ya estoy en esa ruta -->
      <a
        *ngIf="esRutaActual(item.route)"
        routerLink="/"
        class="home-link"
        (click)="toggleMenu()">

        Home

      </a>

    </li>

  </ul>

</nav>
`,

  styles: [`
  .barra-lateral {

  position: fixed;

  top: 15px;
  left: 15px;

  z-index: 2000;

  display: flex;
  justify-content: center;
  align-items: center;
}

/* ========== BOTON ========== */

.hamburguesa {

  width: 48px;
  height: 48px;

  background: #5b5bd6;

  border: none;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 5px;

  padding: 10px;

  cursor: pointer;

  box-shadow: 0 4px 10px rgba(0,0,0,0.4);

  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.hamburguesa:hover {
  transform: scale(1.05);
}

.hamburguesa:active {
  transform: scale(0.95);
}

.hamburguesa span {

  height: 3px;
  width: 100%;

  background: white;

  border-radius: 2px;

  transition: all 0.3s ease;
}

/* ANIMACION X */

.hamburguesa.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburguesa.active span:nth-child(2) {
  opacity: 0;
}

.hamburguesa.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* ========== OVERLAY ========== */

.overlay {

  position: fixed;
  inset: 0;

  background: rgba(0,0,0,0.65);

  backdrop-filter: blur(3px);

  z-index: 1500;

  opacity: 0;
  visibility: hidden;

  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
}

.overlay.active {

  opacity: 1;
  visibility: visible;
}

/* ========== MENU ========== */

.menu-lateral {

  position: fixed;

  top: 0;

  left: -100%;

  width: 280px;

  max-width: 80vw;

  height: 100vh;

  background: #000000ef;

  z-index: 1800;

  padding:
    80px 20px 20px;

  overflow-y: auto;

  transition: left 0.3s ease;

  box-shadow: 4px 0 15px rgba(0,0,0,0.5);
}

.menu-lateral.active {
  left: 0;
}

/* ========== LISTA ========== */

.menu-lateral ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-lateral li {
  margin-bottom: 15px;
}

/* ========== LINKS ========== */

.menu-lateral a {

  display: block;

  background: #0e58a3b2;

  color: white;

  text-decoration: none;

  padding: 14px 16px;

  border-radius: 12px;

  transition:
    transform 0.2s ease,
    background 0.2s ease;

  font-size: clamp(14px, 1vw, 18px);
}

.menu-lateral a:hover {

  background: #1672c7;

  transform: translateX(5px);
}

.menu-lateral a:active {
  transform: scale(0.98);
}

/* ========== HOME ========== */

.home-link {
  background: #8b2323 !important;
}

.home-link:hover {
  background: #b12c2c !important;
}

/* ========== MOVIL ========== */

@media (max-width: 768px) {

  .barra-lateral {

    top: 10px;
    left: 10px;
  }

  .hamburguesa {

    width: 44px;
    height: 44px;

    padding: 8px;
  }

  .menu-lateral {

    width: 85vw;
  }
}
`]
})

export class Hamborguesa {

  menuAbierto = false;

  constructor(public router: Router) {}

  menuItems = [
    { label: 'Personajes', route: '/personajes' },
    { label: 'Objetos', route: '/objetos' },
    { label: 'Enemigos', route: '/enemigos' },
    { label: 'Pisos', route: '/pisos' },
    { label: 'Guías', route: '/guias' },
  ];

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  esRutaActual(route: string): boolean {
    return this.router.url === route;
  }
}