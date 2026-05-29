import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonajesApiService } from '../servicios-api/api/personajes.api';
import { Personaje } from '../servicios-api/modelos_listas/personaje.model';
import { ImagenesPipe } from '../servicios-api/pipes/imagenes-pipe';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [CommonModule, RouterModule, ImagenesPipe],
  templateUrl: './personajes.html',
  styleUrl: './personajes.css',
})
export class Personajes implements OnInit {
  personajes: Personaje[] = [];
  normales: Personaje[] = [];
  tainted: Personaje[] = [];

  constructor(private api: PersonajesApiService, private cdr: ChangeDetectorRef) {}
    async ngOnInit() {
      this.personajes = await this.api.obtenerLista();
      this.normales = this.personajes.filter(
        p => !p.nombre.toLowerCase().includes('tainted')
      );
      this.tainted = this.personajes.filter(
        p => p.nombre.toLowerCase().includes('tainted')
      );
      this.cdr.detectChanges();
  }
}