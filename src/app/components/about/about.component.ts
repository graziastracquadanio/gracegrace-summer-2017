import { Component, OnInit } from '@angular/core';
import content from './about.content';
import { slideInOut } from '../../commons/routing-animation';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [slideInOut],
  host: { '[@routingAnimation]': '' }
})
export class AboutComponent implements OnInit {
  experience: Object[] = content.experience;
  works: Object[] = content.works;

  constructor() { }

  ngOnInit() {
  }

}
