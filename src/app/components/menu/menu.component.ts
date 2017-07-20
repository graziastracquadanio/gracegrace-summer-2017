import 'rxjs/add/operator/takeUntil';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { heightChange } from '../../commons/animations';
import { MenuService } from '../../services/menu.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AuthService } from 'services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [heightChange],
})
export class MenuComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  isOpen;
  menuState: string;
  isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private menuService: MenuService,
    private router: Router
  ) {}

  @Input() color: string;

  ngOnInit() {
    this.authService.isLoggedIn$
      .takeUntil(this.ngUnsubscribe)
      .subscribe(value => {
        this.isLoggedIn = value;
      });

    this.menuService.isOpen$.takeUntil(this.ngUnsubscribe).subscribe(value => {
      this.menuState = value ? 'menu-visible' : 'menu-hidden';
      this.isOpen = value;
    });

    this.router.events.takeUntil(this.ngUnsubscribe).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.menuService.closeMenu();
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }
}
