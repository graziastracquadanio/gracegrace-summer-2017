import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import content from '../../data/cv-content';

@Component({
  selector: 'curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
})
export class CurriculumComponent implements OnInit {
  experience: Object[] = content.experience;
  works: Object[] = content.works;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.map(p => {
      debugger;
    });
  }

  @Input() showPrint: boolean = false;
}
