import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ModalSearchApi }from '../servicios-api/api/modal.search.api';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterLink], 
  template: `
  <nav class="navbar navbar-expand-lg mynav">
  <div class="container-fluid">

    <!-- Marca → lleva al inicio -->
    <a class="navbar-brand mynav-brand" routerLink="/">
      The Isaac of Wiki
    </a>

    <!-- Buscador + Login -->
    <div class="collapse navbar-collapse mynav-nav">
      <form class="d-flex" role="search" (submit)="buscar($event)">
        
        <input 
          class="form-control me-2"
          type="search"
          placeholder="Buscar pisos, personajes, objetos..."
          aria-label="Search"
          [(ngModel)]="textoBusqueda"
          name="busqueda"
        />

        <button class="btn btn-outline-success" type="submit">
          Buscar
        </button>

      </form>

      <!-- Botón login -->
      <a routerLink="/login" class="btn btn-login ms-3">
        Login
      </a>

    </div>

  </div>
</nav>
  `,
styles: [`

/* ===================================================== */
/* NAVBAR */
/* ===================================================== */

.mynav {

    width: 100%;

    background: #121920bd;

    backdrop-filter: blur(4px);

    padding: 12px 0;

    border-radius: 12px;

    margin-bottom: 20px;

    overflow: hidden;
}

/* ===================================================== */
/* CONTAINER */
/* ===================================================== */

.container-fluid {

    width: 100%;

    max-width: 1600px;

    margin: 0 auto;

    padding: 0 20px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 20px;

    flex-wrap: wrap;
}

/* ===================================================== */
/* BRAND */
/* ===================================================== */

.mynav-brand {

    font-weight: bold;

    font-size: clamp(1.2rem, 2vw, 1.7rem);

    color: white;

    text-decoration: none;

    white-space: nowrap;

    transition:
        transform 0.2s ease,
        opacity 0.2s ease;
}

.mynav-brand:hover {

    transform: scale(1.03);

    opacity: 0.9;
}

/* ===================================================== */
/* NAV */
/* ===================================================== */

.mynav-nav {

    display: flex;

    align-items: center;

    justify-content: flex-end;

    flex: 1;

    gap: 15px;

    min-width: 0;

    flex-wrap: wrap;
}

/* ===================================================== */
/* FORM */
/* ===================================================== */

.mynav-nav form {

    display: flex;

    align-items: center;

    gap: 10px;

    width: 100%;

    max-width: 600px;

    margin-left: auto;

    min-width: 0;
}

/* ===================================================== */
/* INPUT */
/* ===================================================== */

.form-control {

    flex: 1;

    min-width: 0;

    border-radius: 20px;

    border: 1px solid #3b4f66;

    background: rgba(255,255,255,0.08);

    color: white;

    padding: 10px 14px;

    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        background 0.2s ease;
}

.form-control::placeholder {

    color: #cfcfcf;
}

.form-control:focus {

    outline: none;

    box-shadow: 0 0 8px #15FF00;

    border-color: #15FF00;

    background: rgba(255,255,255,0.12);
}

/* ===================================================== */
/* BOTONES */
/* ===================================================== */

.btn {

    border-radius: 20px;

    transition:
        transform 0.2s ease,
        background 0.2s ease,
        color 0.2s ease;
}

.btn:hover {

    transform: translateY(-1px);
}

.btn:active {

    transform: scale(0.96);
}

/* ===================================================== */
/* BOTON BUSCAR */
/* ===================================================== */

.btn-outline-success {

    border: 1px solid #15FF00;

    color: #15FF00;

    background: transparent;

    padding: 8px 18px;

    white-space: nowrap;
}

.btn-outline-success:hover {

    background: #15FF0022;

    color: #8fff84;
}

/* ===================================================== */
/* LOGIN */
/* ===================================================== */

.btn-login {

    border-radius: 20px;

    color: white;

    border: 1px solid #15FF00;

    padding: 8px 18px;

    transition: all 0.25s;

    text-decoration: none;

    white-space: nowrap;

    display: flex;

    align-items: center;

    justify-content: center;
}

.btn-login:hover {

    background: #15FF0022;

    color: #15FF00;
}

/* ===================================================== */
/* TABLET */
/* ===================================================== */

@media (max-width: 900px) {

    .container-fluid {

        flex-direction: column;

        align-items: stretch;

        gap: 15px;
    }

    .mynav-brand {

        text-align: center;
    }

    .mynav-nav {

        width: 100%;

        justify-content: center;
    }

    .mynav-nav form {

        max-width: 100%;
    }
}

/* ===================================================== */
/* MOVIL */
/* ===================================================== */

@media (max-width: 600px) {

    .mynav {

        padding: 10px;
    }

    .container-fluid {

        padding: 0 10px;
    }

    .mynav-nav {

        flex-direction: column;

        align-items: stretch;
    }

    .mynav-nav form {

        flex-direction: column;

        width: 100%;
    }

    .form-control {

        width: 100%;
    }

    .btn-outline-success,
    .btn-login {

        width: 100%;

        justify-content: center;
    }

    .btn-login {

        margin-left: 0 !important;
    }
}

/* ===================================================== */
/* MOVIL PEQUEÑO */
/* ===================================================== */

@media (max-width: 400px) {

    .mynav-brand {

        font-size: 1rem;
    }

    .form-control {

        font-size: 14px;
    }

    .btn-outline-success,
    .btn-login {

        font-size: 14px;

        padding: 8px 12px;
    }
}

`] 
})


export class Navbar {
  constructor(
  private modalApi: ModalSearchApi
) {}
  textoBusqueda: string = '';
  
  
  buscar(event: Event) {

  event.preventDefault();

  if (!this.textoBusqueda.trim())
    return;

  this.modalApi.abrir(
    this.textoBusqueda
  );

}
}
