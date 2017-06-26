import { Component } from '@angular/core';
import * as Trianglify from 'trianglify';
import { fadeInOut } from '../../commons/routing-animation';

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  animations: [fadeInOut],
  host: { '[@routingAnimation]': '' }
})

export class IntroComponent {

  constructor() {
  }
}
