import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { heightChange } from '../../commons/routing-animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [heightChange],
})
export class MenuComponent implements OnInit, OnDestroy {
  menuSubscription;
  isOpen;
  menuState: string;

  constructor(private menuService: MenuService) { }

  @Input() color: string;
  @Input() animateFast: boolean;

  ngOnInit() {
    this.menuSubscription = this.menuService.isOpen$.subscribe(
      value => {
        this.menuState = value ? 'menuVisible' : 'menuHidden';
        this.isOpen = value;
      }
    );
  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }
}
