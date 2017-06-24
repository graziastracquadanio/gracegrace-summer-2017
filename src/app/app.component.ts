import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ColorService } from './services';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  changeFast: boolean;
  currentPalette: string;
  colorSubscription;
  intervalId: any = null;

  constructor(
    private colorService: ColorService,
    private router: Router) {
    this.colorService.setNextPalette();
  }

  showNextPalette() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.changeFast = true;
    this.colorService.setNextPalette();
  }

  setCycleIfNeeded() {
    if (this.intervalId === null) {
      this.intervalId = setInterval(() => {
        let timeout = 0;
        if (this.changeFast) {
          this.changeFast = false;
          timeout = 100;
        }

        setTimeout(() => {
          this.colorService.setNextPalette();
        }, timeout);
      }, 6000);
    }
  }

  ngOnInit() {
    this.changeFast = true;
    this.colorSubscription = this.colorService.currentPalette$.subscribe(
      value => {
        this.currentPalette = value;
        this.setCycleIfNeeded();
      }
    );

    this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((val) => {
        this.showNextPalette();
      });
  }

  ngOnDestroy() {
    this.colorSubscription.unsubscribe();
  }
}

