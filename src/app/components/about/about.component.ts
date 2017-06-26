import { Component, OnInit, OnDestroy } from '@angular/core';
import content from '../../data/cv-content';
import { slideInOut, blurInOut } from '../../commons/routing-animation';
import { ColorService, MenuService } from '../../services';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [slideInOut, blurInOut],
  host: {
    '[@routingAnimation]': '' }
})
export class AboutComponent implements OnInit, OnDestroy {
  menuSubscription;
  menuState: string;
  colorSubscription;
  currentPalette;
  experience: Object[] = content.experience;
  works: Object[] = content.works;

  constructor(
    private colorService: ColorService,
    private menuService: MenuService) {
  }

  ngOnInit() {
    this.colorSubscription = this.colorService.currentPalette$.subscribe(
      value => { this.currentPalette = value; }
    );

    this.menuSubscription = this.menuService.isOpen$.subscribe(
      value => {
        this.menuState = value ? 'menuVisible' : 'menuHidden';
      }
    );
  }

  ngOnDestroy() {
    this.colorSubscription.unsubscribe();
  }
}
