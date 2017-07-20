import { AuthService } from 'services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/takeLast';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  returnUrl: string;
  hasError: boolean = false;
  errorMessage: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
  contentStatus: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.takeUntil(this.ngUnsubscribe).subscribe(params => {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    });
    this.authService.isLoggedIn$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        const prevData = this.isLoggedIn;
        if (prevData === null && data) {
          this.router.navigate([this.returnUrl]);
        }

        if (prevData === false) {
          console.log(data);
          this.contentStatus = 'loaded';
        }

        this.isLoggedIn = data;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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

  manageError(error?: any) {
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
