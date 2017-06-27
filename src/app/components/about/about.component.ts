import { Component } from '@angular/core';
import content from '../../data/cv-content';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  experience: Object[] = content.experience;
  works: Object[] = content.works;

  constructor() { }
}
