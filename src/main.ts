import 'zone.js';

import {
  bootstrapApplication
} from '@angular/platform-browser';

import {
  provideHttpClient
} from '@angular/common/http';

import {
  provideZoneChangeDetection
} from '@angular/core';

import {
  provideRouter
} from '@angular/router';

import {
  App
} from './app/app';

import {
  routes
} from './app/app.routes';

bootstrapApplication(App, {

  providers: [

    provideRouter(routes),

    provideHttpClient(),

    provideZoneChangeDetection({
      eventCoalescing: true
    })

  ]

})
.catch(err => console.error(err));