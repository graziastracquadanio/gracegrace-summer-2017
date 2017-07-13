import 'rxjs/add/operator/takeUntil';
import content from '../../data/cv-content';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss'],
})
export class CurriculumComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  shouldPrint: boolean = false;
  experience: Object[] = content.experience;
  works: Object[] = content.works;

  constructor(private route: ActivatedRoute) {}

  @Input() showPrint: boolean = true;

  ngOnInit() {
    this.route.queryParams.takeUntil(this.ngUnsubscribe).subscribe(params => {
      if (params['print'] === 'true') {
        this.shouldPrint = true;
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  callPrinter() {
    if (this.shouldPrint) {
      window.print();
    }
  }
}
