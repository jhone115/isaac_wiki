// src/app/core/auth/auth.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = signal<boolean>(false);

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  login(user: string, pass: string): boolean {
    if (user === 'admin' && pass === '1234') {
      this.loggedIn.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn.set(false);
  }
}
