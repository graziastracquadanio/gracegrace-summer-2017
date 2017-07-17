import { Component } from '@angular/core';
import { AnimationTransitionEvent } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { componentLoaded } from '../../commons/animations';

@Component({
  selector: 'readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.scss'],
  animations: [componentLoaded],
})
export class ReadingsComponent {
  readingSubscription: any;

  // data
  readingNow: object[] = [];
  onTheShelf: object[] = [];
  haveRead: object[] = [];
  wishlist: object[] = [];

  // states
  readingNowState: string = 'not-loaded';
  onTheShelfState: string = 'not-loaded';
  haveReadState: string = 'not-loaded';
  wishlistState: string = 'not-loaded';
  loadingCounter: number = 0;

  constructor(private db: AngularFireDatabase) {
    this.readingSubscription = db.object('readings').subscribe(data =>
      Object.keys(data).map(key => {
        const bucket = key.replace(/(_[a-z])+/g, x => {
          return x.toUpperCase().replace('_', '');
        });

        this[bucket] = data[key];
        this[`${bucket}State`] = 'loaded';
      })
    );
  }

  readingAnimationDone($event: AnimationTransitionEvent) {
    if ($event.toState === 'loaded') {
      this.loadingCounter++;
    }

    if (this.loadingCounter === 4) {
      this.readingSubscription.unsubscribe();
    }
  }
}
