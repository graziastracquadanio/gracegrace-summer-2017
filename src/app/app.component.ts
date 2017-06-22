import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { COLORS } from './commons/color-defs';
import { ColorService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  changeFast: boolean;
  currentPalette: string;
  colorSubscription;

  constructor(
    private colorService: ColorService,
    private router: Router) {

    setInterval(() => {
      this.changeFast = false;
      this.colorService.setNextPalette();
    }, 10000);
  }

  showNextPalette() {
    this.changeFast = true;
    this.colorService.setNextPalette();
  }

  ngOnInit() {
    this.colorSubscription = this.colorService.currentPalette$.subscribe(
      value => {
        this.changeFast = true;
        this.currentPalette = value;
      }
    );

    this.router.events.subscribe((val) => {
      this.colorService.setNextPalette();
    });
  }

  ngOnDestroy() {
    this.colorSubscription.unsubscribe();
  }
}

