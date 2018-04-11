import { Injectable } from '@angular/core';
import { Router, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';


@Injectable()
export class RoleGuard implements CanActivate {
  
  constructor(    
    public router: Router,
    public authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = next.data.expectedRole;
    
    const roles = this.authService.getRoles();

    if (!this.authService.isLoggedIn() || !roles.find(p => p === expectedRole)) {
      this.router.navigate(['auth/login']);
      return false;
    }
    return true;
  }
}
