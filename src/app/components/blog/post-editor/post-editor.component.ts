import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { editorConfig } from 'commons';
import { Post, POST_STATUS } from 'classes';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss'],
})
export class PostEditorComponent implements OnInit, OnDestroy {
  editorConfig: object = editorConfig;
  form: FormGroup;
  paramsSubscription;
  postSubscription;
  post: Post = new Post();
  postList;
  showEditorOptions: boolean = false;
  postStatus: string;
  wordsCounter: number = 0;

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group(this.post.getEditableFields());
    this.postList = this.db.list('/posts');
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.postStatus = POST_STATUS.loading;
        this.postSubscription = this.db
          .object(`/posts/${id}`)
          .subscribe(data => {
            this.post = new Post(data);
            this.form.patchValue(this.post.getEditableFields());

            this.postStatus = POST_STATUS.saved;
          });
      } else {
        this.post = new Post();
        this.form.patchValue(this.post.getEditableFields());
        this.postStatus = POST_STATUS.new;
      }
    });

    this.form.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(data => {
        this.prepareForSaving(data);
      });
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }

    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  async prepareForSaving(newData) {
    this.postStatus = POST_STATUS.saving;
    this.post.updatePost(newData);

    let id = this.post.id;

    if (!id) {
      const newPost = await this.postList.push(this.post);
      id = newPost.key;
      this.post.updatePost({ id });
    }

    this.savePost();
  }

  async savePost() {
    await this.postList.update(this.post.id, this.post);
    this.postStatus = POST_STATUS.saved;
  }

  toggleEditorOptions() {
    this.showEditorOptions = !this.showEditorOptions;
  }

  setWordsCounter(editor) {
    if (editor.text) {
      const words = editor.text.replace(/\r?\n|\r/, ' ').match(/\S+/g);
      this.wordsCounter = words !== null ? words.length : 0;
    }
  }
}
