import { Component } from '@angular/core';
import readings from '../../data/readings';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.scss']
})
export class ReadingsComponent {
  currentReading: FirebaseListObservable<any[]>;
  waitingOnTheShelf: FirebaseListObservable<any[]>;
  finishedReadings: FirebaseListObservable<any[]>;
  wishlistReadings: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.currentReading = db.list('readings/reading_now');
    this.waitingOnTheShelf = db.list('readings/on_the_shelf');
    this.finishedReadings = db.list('readings/have_read');
    this.wishlistReadings = db.list('readings/wishlist');
  }
}
