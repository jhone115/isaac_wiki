import { Injectable, signal } from '@angular/core';
import { computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API = "https://auth-api.jhoncasmen94.workers.dev";
  private loggedIn = signal(false);

  isLoggedIn = computed(() => this.loggedIn());

  setToken(token: string) {
    localStorage.setItem("token", token);
    this.loggedIn.set(true);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  async register(usuario: string, email: string, pass: string) {
    return fetch(`${this.API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, email, pass })
    });
  }

async login(email: string, pass: string) {
  const res = await fetch(`${this.API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      pass: pass
    })
  });

  if (!res.ok) {
    console.log(await res.text()); // 👈 importante
    return false;
  }

  const data = await res.json();
  localStorage.setItem("token", data.token);
  return true;
}

  logout() {
    this.loggedIn.set(false);
    localStorage.removeItem("token");
  }
}