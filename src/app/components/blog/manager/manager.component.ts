import {
  AngularFireDatabase,
  FirebaseListObservable,
} from 'angularfire2/database';
import { Component } from '@angular/core';

@Component({
  selector: 'manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent {
  postList: FirebaseListObservable<any>;

  constructor(db: AngularFireDatabase) {
    this.postList = db.list('/posts');
  }
}
