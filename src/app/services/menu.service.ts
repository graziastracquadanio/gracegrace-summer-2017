import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MenuService {
  private isOpenSource = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSource.asObservable();

  constructor() { }

  openMenu() {
    this.isOpenSource.next(true);
  }

  closeMenu() {
    this.isOpenSource.next(false);
  }

  toggleMenu() {
    this.isOpenSource.next(!this.isOpenSource.value);
  }
}
