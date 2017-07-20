import {
  AnimationTransitionEvent,
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { blurInOut, fadeInOut } from '../../commons/animations';
import { ColorService, MenuService } from '../../services';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [fadeInOut, blurInOut],
  host: {
    '[@routingAnimation]': '',
  },
})
export class ContentComponent implements OnInit, OnDestroy {
  contentClass: string = '';
  heightClass: string = 'content-height';
  pageType: string;
  menuSubscription;
  menuState: string;
  colorSubscription;
  currentPalette;

  constructor(
    private colorService: ColorService,
    private menuService: MenuService
  ) {}

  /*
    Define the height of the page.
    Allowed values are:
    'content' => auto height based on content
    'screen' => height based on screen height (100vh)
  */
  @Input()
  set height(value: string) {
    this.heightClass = `${value}-height`;
  }

  /*
    Define if the content is centered in the screen.
  */
  @Input()
  set centered(value) {
    this.heightClass = 'screen-height';
    this.contentClass = 'centered-content';
  }

  /*
    Define a custom class for the main container
  */
  @Input() containerClass: string = '';

  /*
    Define if the content finished loding
  */
  @Input() contentStatus: string = 'loaded';

  /*
    Emit event after routing animation is done
  */
  @Output() afterAnimation = new EventEmitter();

  animationDone($event: AnimationTransitionEvent) {
    this.afterAnimation.emit();
  }

  ngOnInit() {
    this.colorSubscription = this.colorService.currentPalette$.subscribe(
      value => {
        this.currentPalette = value;
      }
    );

    this.menuSubscription = this.menuService.isOpen$.subscribe(value => {
      this.menuState = value ? 'menu-visible' : 'menu-hidden';
    });
  }

  ngOnDestroy() {
    this.colorSubscription.unsubscribe();
    this.menuSubscription.unsubscribe();
  }
}
