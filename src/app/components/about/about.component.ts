import { Component, OnInit, OnDestroy } from '@angular/core';
import content from './about.content';
import { slideInOut } from '../../commons/routing-animation';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [slideInOut],
  host: { '[@routingAnimation]': '' }
})
export class AboutComponent implements OnInit {
  colorSubscription;
  currentPalette;
  experience: Object[] = content.experience;
  works: Object[] = content.works;

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
