import { Component, OnInit, OnDestroy } from '@angular/core';
import { fadeInOut } from '../../commons/routing-animation';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'stuff',
  templateUrl: './stuff.component.html',
  styleUrls: ['./stuff.component.scss'],
  animations: [fadeInOut],
  host: { '[@routingAnimation]': '' }
})
export class StuffComponent implements OnInit, OnDestroy {
  colorSubscription;
  currentPalette;

  constructor(private colorService: ColorService) {
  }

  ngOnInit() {
    this.colorSubscription = this.colorService.currentPalette$.subscribe(
      value => {
        this.currentPalette = value;
      }
    );
  }

  ngOnDestroy() {
    this.colorSubscription.unsubscribe();
  }

}
