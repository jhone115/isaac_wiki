import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth/auth';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  template: `
    <div class="login-container">
      <div class="login-box">
        <div class="login-header">
          <span class="skull">💀</span>
          <h2>ACCESO</h2>
          <span class="skull">💀</span>
        </div>

        <div class="form-group">
          <label>EMAIL</label>
          <input [(ngModel)]="email" placeholder="Ingresa tu email" name="email" />
        </div>

        <div class="form-group">
          <label>CONTRASEÑA</label>
          <input [(ngModel)]="pass" type="password" placeholder="••••••••" name="pass" />
        </div>

        <p class="error" *ngIf="error">{{ error }}</p>

        <button (click)="login()" class="btn-entrar">ENTRAR</button>

        <p class="link-login">¿No tienes cuenta? <a routerLink="/registro">Regístrate</a></p>
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
      box-shadow:
        0 0 30px #8b3a3a88,
        inset 0 0 20px rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      padding: 50px 60px;
      width: 500px;
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

    .skull {
      font-size: 1.3rem;
    }

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
      transition:
        border-color 0.2s,
        box-shadow 0.2s;
    }

    .form-group input:focus {
      border-color: #e8c97a;
      box-shadow: 0 0 8px #e8c97a55;
    }

    .form-group input::placeholder {
      color: #5a4a3a;
    }

    .btn-entrar {
      margin-top: 10px;
      background: linear-gradient(180deg, #8b2020, #5a1010);
      border: 2px solid #c04040;
      border-radius: 3px;
      color: #f0e0c0;
      font-family: 'Press Start 2P', monospace;
      font-size: 0.85rem;
      letter-spacing: 3px;
      padding: 16px;
      cursor: pointer;
      transition: all 0.2s;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
    }

    .btn-entrar:hover {
      background: linear-gradient(180deg, #b03030, #7a1a1a);
      box-shadow: 0 0 15px #c0404088;
      transform: scale(1.02);
    }

    .btn-entrar:active {
      transform: scale(0.98);
    }

    .error {
      color: #ff6060;
      font-size: 0.5rem;
      text-align: center;
      text-shadow: 0 0 8px #ff000066;
      margin: 0;
    }

    .link-login {
      color: #a08060;
      font-size: 0.6rem;
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
  `,
})
export class Login {
  email = '';
  pass = '';
  error = '';

  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  async login() {
    this.error = '';

    const ok = await this.auth.login(this.email, this.pass);

    if (ok) {
      const redirect =
        this.route.snapshot.queryParamMap.get('redirect') || '/';

      this.router.navigateByUrl(redirect, { replaceUrl: true });
    } else {
      this.error = 'Credenciales incorrectas';
    }
  }
}
