import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ColorService } from './services';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentPalette: string;
  colorSubscription;

  constructor(private colorService: ColorService, private router: Router) {
    this.colorService.setNextPalette();
  }

  showNextPalette() {
    this.colorService.setNextPalette();
  }

  ngOnInit() {
    this.colorSubscription = this.colorService.currentPalette$.subscribe(
      value => {
        this.currentPalette = value;
      }
    );

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const shouldChangeColor = !this.colorService.isCurrentPaletteInWhitelist();
        if (shouldChangeColor) {
          this.showNextPalette();
        }
      } else if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnDestroy() {
    this.colorSubscription.unsubscribe();
  }
}
