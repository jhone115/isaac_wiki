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
          <input [(ngModel)]="usuario" placeholder="Ingresa tu nombre de usuario" name="usuario" />
        </div>

        <div class="form-group">
          <label>EMAIL</label>
          <input [(ngModel)]="email" type="email" placeholder="tu@email.com" name="email" />
        </div>

        <div class="form-group">
          <label>CONTRASEÑA</label>
          <input [(ngModel)]="pass" type="password" placeholder="••••••••" name="pass" />
        </div>

        <div class="form-group">
          <label>CONFIRMAR CONTRASEÑA</label>
          <input [(ngModel)]="confirmPass" type="password" placeholder="••••••••" name="confirmPass" />
        </div>

        <p class="error"   *ngIf="error">{{ error }}</p>
        <p class="success" *ngIf="exito">{{ exito }}</p>

        <button (click)="registrar()" class="btn-entrar" [disabled]="cargando">
          {{ cargando ? 'REGISTRANDO...' : 'CREAR CUENTA' }}
        </button>

        <p class="link-login">
          ¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión</a>
        </p>

      </div>
    </div>
  `,
  styles: `
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

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
      text-shadow: 0 0 10px #e8c97a88;
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
      letter-spacing: 2px;
    }

    .form-group input {
      background: rgba(20, 10, 10, 0.8);
      border: 2px solid #5a2a2a;
      border-radius: 3px;
      color: #f0e0c0;
      padding: 14px 16px;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.7rem;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-group input:focus {
      border-color: #e8c97a;
      box-shadow: 0 0 8px #e8c97a55;
    }

    .form-group input::placeholder { color: #5a4a3a; }

    .btn-entrar {
      margin-top: 10px;
      background: linear-gradient(180deg, #8b2020, #5a1010);
      border: 2px solid #c04040;
      border-radius: 3px;
      color: #f0e0c0;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.8rem;
      letter-spacing: 2px;
      padding: 16px;
      cursor: pointer;
      transition: all 0.2s;
      text-shadow: 0 1px 3px rgba(0,0,0,0.8);
    }

    .btn-entrar:hover:not(:disabled) {
      background: linear-gradient(180deg, #b03030, #7a1a1a);
      box-shadow: 0 0 15px #c0404088;
      transform: scale(1.02);
    }

    .btn-entrar:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .error {
      color: #ff6060;
      font-size: 0.65rem;
      text-align: center;
      text-shadow: 0 0 8px #ff000066;
      margin: 0;
    }

    .success {
      color: #60ff90;
      font-size: 0.65rem;
      text-align: center;
      text-shadow: 0 0 8px #00ff4466;
      margin: 0;
    }

    .link-login {
      color: #a08060;
      font-size: 0.45rem;
      text-align: center;
      margin: 0;
    }

    .link-login a {
      color: #e8c97a;
      text-decoration: none;
    }

    .link-login a:hover {
      text-decoration: underline;
    }
  `
})
export class Registro {
  usuario     = '';
  email       = '';
  pass        = '';
  confirmPass = '';
  error       = '';
  exito       = '';
  cargando    = false;

  private router = inject(Router);
  private auth   = inject(AuthService);

  registrar() {
    this.error = '';
    this.exito = '';

    // Validaciones
    if (!this.usuario || !this.email || !this.pass || !this.confirmPass) {
      this.error = 'Completa todos los campos'; return;
    }
    if (this.pass !== this.confirmPass) {
      this.error = 'Las contraseñas no coinciden'; return;
    }
    if (this.pass.length < 6) {
      this.error = 'Mínimo 6 caracteres'; return;
    }
    if (!this.email.includes('@')) {
      this.error = 'Email inválido'; return;
    }

    this.cargando = true;

    // implementación API
    // this.auth.registrar(this.usuario, this.email, this.pass).subscribe(...)
    setTimeout(() => {
      this.cargando = false;
      this.exito = '¡Cuenta creada! Redirigiendo...';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    }, 1000);
  }
}