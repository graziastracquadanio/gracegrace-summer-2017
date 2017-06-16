import { Component, OnInit } from '@angular/core';
import content from './about.content';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  experience: Object[] = content.experience;
  works: Object[] = content.works;

  constructor() { }

  ngOnInit() {
  }

}
