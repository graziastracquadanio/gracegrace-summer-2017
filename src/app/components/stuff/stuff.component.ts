import { Component } from '@angular/core';
import { AnimationTransitionEvent } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { componentLoaded } from '../../commons/animations';

@Component({
  selector: 'stuff',
  templateUrl: './stuff.component.html',
  styleUrls: ['./stuff.component.scss'],
  animations: [componentLoaded],
})
export class StuffComponent {
  bucketListSubscription: any;
  codepenListSubscription: any;
  quoteListSubscription: any;

  bucketList: object[] = [];
  codepenList: object[] = [];
  quoteList: object[] = [];

  bucketListState: string = 'not-loaded';
  codepenListState: string = 'not-loaded';
  quoteListState: string = 'not-loaded';

  constructor(private db: AngularFireDatabase) {
    this.bucketListSubscription = db.list('bucketlist').subscribe(data => {
      this.bucketList = data;
      this.bucketListState = 'loaded';
    });

    this.codepenListSubscription = db.list('codepen-ideas').subscribe(data => {
      this.codepenList = data;
      this.codepenListState = 'loaded';
    });

    this.quoteListSubscription = db.list('quotes').subscribe(data => {
      this.quoteList = data;
      this.quoteListState = 'loaded';
    });
  }

  animationDone($event: AnimationTransitionEvent, caller: string) {
    if ($event.toState === 'loaded') {
      this[`${caller}Subscription`].unsubscribe();
    }
  }
}
