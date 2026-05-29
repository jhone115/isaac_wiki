import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonajesApiService } from '../servicios-api/api/personajes.api';
import { Personaje } from '../servicios-api/modelos_listas/personaje.model';
import { OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-ruleta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: ` 
<div class="wrapper" *ngIf="personajesSeleccionados.length">

  <div class="ruleta-contenedor">

    <div class="personaje-slot"
         *ngFor="let personaje of personajesSeleccionados; let i = index"
         [class.reveal]="revelados.includes(i)">

      <div class="personaje-card">

        <a [routerLink]="['/personaje']"
           [queryParams]="{ id: personaje.id }">

          <div class="personaje-imagen">

            <img *ngFor="let img of getImagenes(personaje.imagen)"
                 [src]="'assets/imagenes/' + img"
                 [alt]="personaje.nombre">

          </div>

          <div class="personaje-nombre">
            {{ personaje.nombre }}
          </div>

          <div class="personaje-vida">

            <img *ngFor="let corazon of generarCorazones(personaje.vida)"
                 [src]="corazon"
                 width="18">

          </div>

          <div class="personaje-descripcion">
            {{ personaje.descripcioncorta }}
          </div>

        </a>

      </div>

    </div>

  </div>

  <button class="btn-ruleta"
          (click)="inicializarRuleta()">

    🎲 Nueva ruleta

  </button>

</div>
  `,
  styles:`
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 25px;
    padding: 20px;
}

.ruleta-contenedor {
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 30px;
    flex-wrap: wrap;
}

.personaje-slot {
    display: flex;
    justify-content: center;
}

.personaje-card {
    width: 180px;
    min-height: 240px;
    opacity: 0;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 12px;
    padding: 15px;
    border: 2px solid #444;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    transform: translateY(30px) scale(0.9);
    transition:
      transform 0.4s ease,
      opacity 0.4s ease,
      box-shadow 0.4s ease;
    text-align: center;
}

.personaje-card a {
    text-decoration: none;
    color: inherit;
}

.personaje-card:hover {
    transform: translateY(-6px) scale(1.02);
    border-color: #b0dcdd;
    box-shadow:
      0 0 12px #b0dcdd,
      0 0 24px rgba(176,220,221,0.4);
}

.reveal .personaje-card {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.personaje-imagen img {
    width: 64px;
    image-rendering: pixelated;
    margin-bottom: 10px;
}

.personaje-nombre {
    color: #1e7bff;
    font-family: 'mifuente';
    font-size: 1rem;
    margin-bottom: 10px;
    text-transform: uppercase;
}

.personaje-vida {
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-bottom: 12px;
}

.personaje-descripcion {
    color: white;
    font-size: 0.8rem;
    line-height: 1.4;
}

.btn-ruleta {
    width: 180px;
    height: 42px;
    border-radius: 6px;
    background: transparent;
    border: 1px solid #3ea6ff;
    color: #d7ecff;
    font-weight: bold;
    transition: 0.3s;
}

.btn-ruleta:hover {
    background: rgba(62,166,255,0.15);
    transform: scale(1.05);
}
  `,
})
export class Ruleta implements OnInit {

  revelados: number[] = [];
  personajesSeleccionados: any[] = [];
  constructor(
  private personajesapi: PersonajesApiService,
  private cdr: ChangeDetectorRef
) {}

async ngOnInit() {
  await this.inicializarRuleta();
}

  getImagenes(imagen: string | string[]) {
    return Array.isArray(imagen) ? imagen : [imagen];
  }

async inicializarRuleta() {
  const data = await this.personajesapi.obtenerPersonajes();
  const ids = this.obtenerPersonajesAleatorios(data, 3);
  this.personajesSeleccionados = ids.map(id => ({
    id,
    ...data[id]
  }));
  this.cdr.detectChanges();
  this.revelados = [];
  this.personajesSeleccionados.forEach((_, index) => {
    setTimeout(() => {
      this.revelados.push(index);
      this.cdr.detectChanges();
    }, index * 400);
  });

}

  obtenerPersonajesAleatorios(personajes: any, cantidad: number = 3) {
    const ids = Object.keys(personajes);
    const aleatorios: string[] = [];

    while (aleatorios.length < cantidad && ids.length > 0) {
      const index = Math.floor(Math.random() * ids.length);
      const id = ids.splice(index, 1)[0];
      aleatorios.push(id);
    }

    return aleatorios;
  }

  generarCorazones(vida: any[]) {
    let corazones: string[] = [];

    vida.forEach(obj => {
      for (let i = 0; i < obj.cantidad; i++) {
        corazones.push(`assets/imagenes/consumibles/corazon ${obj.tipo}.png`);
      }
    });

    return corazones;
  }
}