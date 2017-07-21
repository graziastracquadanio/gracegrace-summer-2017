import {
  AngularFireDatabase,
  FirebaseListObservable,
} from 'angularfire2/database';
import { Component } from '@angular/core';
import { Post } from 'classes';

@Component({
  selector: 'manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent {
  postList: FirebaseListObservable<any>;

  constructor(db: AngularFireDatabase) {
    this.postList = db.list('/posts', {
      query: { orderByChild: 'creationDate' },
    });
  }

  toggleIsPublic(post: Post) {
    if (post.id) {
      this.postList.update(post.id, { isPublic: !post.isPublic });
    }
  }

  deletePost(id: string) {
    this.postList.remove(id);
  }
}
