import { Component, signal } from '@angular/core';
import { Hamborguesa } from "./hamborguesa/hamborguesa";
import { Navbar } from "./navbar/navbar";
import { RouterOutlet } from '@angular/router';
import {SearchModal} from './servicios-api/componentes/searchmodal/search.modal';

@Component({
  selector: 'app-root',
imports: [Hamborguesa, Navbar, RouterOutlet, SearchModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('isaias-en-angular');
}
