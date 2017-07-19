import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  private isLoggedInSource = new BehaviorSubject<boolean>(null);
  isLoggedIn$ = this.isLoggedInSource.asObservable();
  staticIsLoggedIn: boolean;

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.auth.onAuthStateChanged(data => {
      this.staticIsLoggedIn = data && data.uid ? true : false;
      this.isLoggedInSource.next(this.staticIsLoggedIn);
    });
  }

  login({ email, password }) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  isLoggedIn() {
    console.log(this.afAuth.auth.currentUser);
    return this.staticIsLoggedIn;
  }
}
