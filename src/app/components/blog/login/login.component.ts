import { AuthService } from 'services';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  hasError: boolean = false;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    const isLoggedInSubscription = this.authService.isLoggedIn$.subscribe(
      data => {
        if (data) {
          this.router.navigate([this.returnUrl]);
        }

        if (typeof data === 'boolean') {
          isLoggedInSubscription.unsubscribe();
        }
      }
    );
  }

  login(loginForm: NgForm) {
    if (!loginForm.valid) {
      return;
    }

    this.authService.login(loginForm.value).then(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.manageError(error);
      }
    );
  }

  manageError(error: any) {
    if (!error) {
      this.hasError = false;
      this.errorMessage = '';
      return;
    }

    this.hasError = true;
    switch (error.code) {
      case 'auth/invalid-email':
        this.errorMessage = 'Hey! Are you sure this is a valid email address';
        break;

      case 'auth/wrong-password':
        this.errorMessage = 'Ops...The password seems to be wrong!';
        break;

      case 'auth/user-not-found':
        this.errorMessage = 'Hey! Who the hell are you?!?';
        break;

      default:
        this.errorMessage = 'Something seems to be wrong. Can you try again?';
        break;
    }
  }
}
