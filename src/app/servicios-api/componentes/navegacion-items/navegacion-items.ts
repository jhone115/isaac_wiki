import { Component } from '@angular/core';

import { RouterModule }
from '@angular/router';

@Component({

  selector: 'app-navegacion-items',

  standalone: true,

  imports: [RouterModule],

  templateUrl:
    './navegacion-items.html',

  styleUrls:
    ['./navegacion-items.css']

})

export class NavegacionItems {}