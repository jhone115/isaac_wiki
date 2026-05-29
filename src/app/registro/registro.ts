import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  template: `
    <div class="login-container">
      <div class="login-box">

        <div class="login-header">
          <span class="skull">💀</span>
          <h2>REGISTRO</h2>
          <span class="skull">💀</span>
        </div>

        <div class="form-group">
          <label>USUARIO</label>
          <input [(ngModel)]="usuario" name="usuario" />
        </div>

        <div class="form-group">
          <label>EMAIL</label>
          <input [(ngModel)]="email" type="email" name="email" />
        </div>

        <div class="form-group">
          <label>CONTRASEÑA</label>
          <input [(ngModel)]="pass" type="password" name="pass" />
        </div>

        <div class="form-group">
          <label>CONFIRMAR CONTRASEÑA</label>
          <input [(ngModel)]="confirmPass" type="password" name="confirmPass" />
        </div>

        <p class="error" *ngIf="error">{{ error }}</p>
        <p class="success" *ngIf="exito">{{ exito }}</p>

        <button (click)="registrar()" [disabled]="cargando" class="btn-entrar">
          {{ cargando ? 'REGISTRANDO...' : 'CREAR CUENTA' }}
        </button>

        <p class="link-login">
          ¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión</a>
        </p>

      </div>
    </div>
  `,
})
export class Registro {

  usuario = '';
  email = '';
  pass = '';
  confirmPass = '';

  error = '';
  exito = '';
  cargando = false;

  private auth = inject(AuthService);
  private router = inject(Router);

  async registrar() {

    this.error = '';
    this.exito = '';

    // 🧪 validaciones
    if (!this.usuario || !this.email || !this.pass || !this.confirmPass) {
      this.error = 'Completa todos los campos';
      return;
    }

    if (this.pass !== this.confirmPass) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    if (this.pass.length < 6) {
      this.error = 'Mínimo 6 caracteres';
      return;
    }

    this.cargando = true;

    try {

      const res = await this.auth.registrar(
        this.usuario,
        this.email,
        this.pass
      );

      this.cargando = false;

      if (!res.ok) {
        const msg = await res.text();
        this.error = msg || 'Error al registrar';
        return;
      }

      this.exito = 'Cuenta creada... abriendo portal 👁️';

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1200);

    } catch (e) {
      this.cargando = false;
      this.error = 'No hay conexión con el backend';
    }
  }
}