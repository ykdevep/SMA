import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
      
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(["auth/login"])
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(["auth/login"])
    return false;
  }
}
