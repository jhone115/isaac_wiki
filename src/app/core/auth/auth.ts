// src/app/core/auth/auth.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API = "https://auth-api.jhoncasmen94.workers.dev";

  private loggedIn = signal<boolean>(false);

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  // 🧾 REGISTRO
  async registrar(usuario: string, email: string, pass: string): Promise<Response> {
    return fetch(`${this.API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, email, pass })
    });
  }

  // 🔐 LOGIN
  async login(user: string, pass: string): Promise<boolean> {
    const res = await fetch(`${this.API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pass })
    });

    if (!res.ok) return false;

    const data = await res.json();

    this.loggedIn.set(true);
    console.log("USER LOGGED:", data.user);

    return true;
  }

  logout(): void {
    this.loggedIn.set(false);
  }
}