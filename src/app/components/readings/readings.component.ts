import { Component } from '@angular/core';
import readings from '../../data/readings';

@Component({
  selector: 'readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.scss']
})
export class ReadingsComponent {
  currentReading: object = readings.reading_now;
  waitingOnTheShelf: object = readings.on_the_shelf;
  finishedReadings: object = readings.have_read;
  wishlistReadings: object = readings.wishlist;

  constructor() {
  }

}
