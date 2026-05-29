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
   styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      font-family: 'Press Start 2P', monospace;
    }

    .login-box {
      background: rgba(0, 0, 0, 0.75);
      border: 3px solid #8b3a3a;
      box-shadow: 0 0 30px #8b3a3a88, inset 0 0 20px rgba(0,0,0,0.5);
      border-radius: 4px;
      padding: 50px 60px;
      width: 520px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .login-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      margin-bottom: 10px;
    }

    .login-header h2 {
      color: #e8c97a;
      font-size: 1.6rem;
      letter-spacing: 4px;
      margin: 0;
    }

    .skull { font-size: 1.3rem; }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-group label {
      color: #a08060;
      font-size: 0.7rem;
    }

    .form-group input {
      background: rgba(20, 10, 10, 0.8);
      border: 2px solid #5a2a2a;
      border-radius: 3px;
      color: #f0e0c0;
      padding: 14px 16px;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.7rem;
    }

    .btn-entrar {
      margin-top: 10px;
      background: linear-gradient(180deg, #8b2020, #5a1010);
      border: 2px solid #c04040;
      color: #f0e0c0;
      font-family: 'Press Start 2P', monospace;
      padding: 16px;
      cursor: pointer;
    }

    .error {
      color: #ff6060;
      font-size: 0.6rem;
      text-align: center;
    }

    .success {
      color: #60ff90;
      font-size: 0.6rem;
      text-align: center;
    }

    .link-login {
      text-align: center;
      font-size: 0.6rem;
      color: #a08060;
    }

    .link-login a {
      color: #e8c97a;
    }
  `]
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