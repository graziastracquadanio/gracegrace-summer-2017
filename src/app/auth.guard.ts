import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLoggedIn = this.authService.isLoggedIn();
    if (!isLoggedIn) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
    }
    return isLoggedIn;
  }
}
