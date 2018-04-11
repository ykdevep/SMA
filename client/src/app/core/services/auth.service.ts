import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Apollo } from 'apollo-angular';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LocalStorageService } from './local-storage.service';
import { User } from '@app/core/models/user.model';

const TOKEN_PREFIX = 'TOKEN';

@Injectable()
export class AuthService {

  private _isAuthenticated = new BehaviorSubject(false);

  constructor(
    private localStorageService: LocalStorageService,
    private apollo: Apollo,
    public jwtHelper: JwtHelperService,
  ) {     
    const token =  this.localStorageService.getItem(TOKEN_PREFIX);        
    if (token) {
      if (!this.jwtHelper.isTokenExpired(token)) {
        this._isAuthenticated.next(true);
      } else {
        this._isAuthenticated.next(false);
      }      
    }
    this._isAuthenticated.next(false);
  }

  getToken(): string {
    return this.localStorageService.getItem(TOKEN_PREFIX);
  }

  getRoles(): string[] {
    const token =  this.localStorageService.getItem(TOKEN_PREFIX);
    if (token) {    
      const decodeToken = this.jwtHelper.decodeToken(token);
      return decodeToken.roles;
    }
    return [];
  }

  isAdmin(): boolean {
    if (!this.isLoggedIn()){
      return false;
    }
    const roles = this.getRoles();
    if (roles.find(p => p == "Administrador")) {
      return true;
    }
    return false;
  }

  isStudent(): boolean {
    if (!this.isLoggedIn()){
      return false;
    }

    const roles = this.getRoles();
    if (roles.find(p => p == "Estudiante")) {
      return true;
    }
    return false;
  }

  isSpecialist(): boolean {
    if (!this.isLoggedIn()){
      return false;
    }
    const roles = this.getRoles();
    if (roles.find(p => p == "Especialista")) {
      return true;
    }
    return false;
  }

  getFirstname(): string {
    const token =  this.localStorageService.getItem(TOKEN_PREFIX);
    if (token) {    
      const decodeToken = this.jwtHelper.decodeToken(token);
      return decodeToken.firstname;
    }
    return null;
  }

  isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  isLoggedIn(): boolean {
    const token =  this.localStorageService.getItem(TOKEN_PREFIX);
    if (token) {            
      if (!this.jwtHelper.isTokenExpired(token)) {
        this._isAuthenticated.next(true);
        return true;
      }
      this._isAuthenticated.next(false);
    }
    return false;
  }

  login(token: any): void {
    this.apollo.getClient().resetStore();
    this.localStorageService.setItem(TOKEN_PREFIX, token);
    this._isAuthenticated.next(true);
  }

  singup(token: any): void {
    this.apollo.getClient().resetStore();
    this.localStorageService.setItem(TOKEN_PREFIX, token);
    this._isAuthenticated.next(true);
  }

  profile(token: any): void {
    this.localStorageService.setItem(TOKEN_PREFIX, token);
    this._isAuthenticated.next(true);
  }

  logout(): void {
    this.localStorageService.removeItem(TOKEN_PREFIX); 
    this._isAuthenticated.next(false);
    this.apollo.getClient().resetStore();
  }

}
