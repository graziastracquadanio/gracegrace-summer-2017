import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ColorService, QuoteService } from './services';
import 'rxjs/add/operator/filter';
import { Quote } from 'models';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentPalette: string;
  colorSubscription;
  quote: Quote = new Quote();

  constructor(
    private colorService: ColorService,
    private quoteService: QuoteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.colorSubscription = this.colorService.currentPalette$.subscribe(
      value => {
        console.log(value);
        this.currentPalette = value;
        this.backgroundColor = this.colorService.getPaletteColor(value, 0.9);
      }
    );

    this.quoteService.getQOD().subscribe(quote => (this.quote = quote));

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnDestroy() {
    this.colorSubscription.unsubscribe();
  }

  // @HostBinding('style.color') currentColor = 'white';
  @HostBinding('style.backgroundColor') backgroundColor = 'white';
}
