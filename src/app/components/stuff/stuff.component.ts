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
  readingListSubscription: any;

  bucketList: object[] = [];
  codepenList: object[] = [];
  quoteList: object[] = [];
  readingList: object = {
    'reading': [],
    'read': [],
    'waiting': [],
  };

  bucketListState: string = 'not-loaded';
  codepenListState: string = 'not-loaded';
  quoteListState: string = 'not-loaded';
  readingListState: string = 'not-loaded';

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

    this.readingListSubscription = db.list('readings').subscribe(data => {
      this.sortReadings(data);
      this.readingListState = 'loaded';
    });
  }

  sortReadings(data) {
    data.forEach(item => {
      const status = item.status || 'waiting';
      this.readingList[status].push(item);
    });

    Object.keys(this.readingList).forEach(status => {
      this.readingList[status].sort((a, b) => {
        const a_author = a.author.toUpperCase();
        const b_author = b.author.toUpperCase();

        if (a_author === b_author) {
          const a_title = a.title.toUpperCase();
          const b_title = b.title.toUpperCase();

          return a_title > b_title ? 1 : -1;
        } else {
          return a_author > b_author ? 1 : -1;
        }
      })
    });
  }

  animationDone($event: AnimationTransitionEvent, caller: string) {
    if ($event.toState === 'loaded') {
      this[`${caller}Subscription`].unsubscribe();
    }
  }
}
