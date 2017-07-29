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
  isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (!this.isLoggedIn) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
    } else if (state.url === '/logout') {
      this.authService.logout();
    }

    return this.isLoggedIn;
  }
}
