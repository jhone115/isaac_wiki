import { Routes } from '@angular/router';
import { Personaje } from './personajes/personaje/personaje';
import { Personajes } from './personajes/personajes';
import { Principal } from './principal/principal';
import { Objetos } from './objetos/objetos';
import { Guias } from './guias/guias';
import { Enemigos } from './enemigos/enemigos';
import { Pisos } from './pisos/pisos';
import { authGuard } from './core/auth/auth-guard';
import { EnemigosDetalle } from './enemigos/enemigos-detalle/enemigos-detalle';
import { Pickups } from './objetos/pick-ups/pick-ups';
import { Trinkets } from './objetos/trinkets/trinkets';
import { Sinergias } from './objetos/sinergias/sinergias';

export const routes: Routes = [
  { path: '', component: Principal },
  { path: 'personajes', component: Personajes },
  { path: 'personaje', component: Personaje },
  { path: 'objetos', component: Objetos },
  { path: 'guias', component: Guias },
  { path: 'pisos', component: Pisos },
  { path: 'pickups', component: Pickups },
  {path: 'trinkets', component: Trinkets},
  {path: 'sinergias', component: Sinergias},
  {
  path: 'guias',
  loadComponent: () =>
    import('./guias/guias')
    .then(m => m.Guias)
},

{
  path: 'guias/rutas',
  loadComponent: () =>
    import('./guias/rutas/rutas')
    .then(m => m.Rutas)
},

{
  path: 'guias/finales',
  loadComponent: () =>
    import('./guias/finales/finales')
    .then(m => m.Finales)
},

{
  path: 'guias/desbloqueos',
  loadComponent: () =>
    import('./guias/debloqueos/debloqueos')
    .then(m => m.Desbloqueos)
},
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./admin/admin').then(m => m.Admin)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login').then(m => m.Login)
  },
  {
  path: 'registro',
  loadComponent: () =>
    import('./registro/registro').then(m => m.Registro)
},
  {
  path: 'enemigos/:id',
  component: EnemigosDetalle
},

{
  path: 'enemigos',
  component: Enemigos,
  data: {
    tipo: 'enemigos'
  }
},

{
  path: 'jefes',
  component: Enemigos,
  data: {
    tipo: 'jefes'
  }
},
{
  path: 'pisos/:id',
  loadComponent: () =>
    import('./pisos/piso-detalle/piso-detalle')
    .then(m => m.PisoDetalle)
},

  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found').then(m => m.NotFound)
  }

];
