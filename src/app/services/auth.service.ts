import { Injectable } from '@angular/core';
import { LocalStorageService } from './data/localStorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor(private localStorage: LocalStorageService){}

  login() {
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated  || this.localStorage.hasItem('bpn');
  }
}