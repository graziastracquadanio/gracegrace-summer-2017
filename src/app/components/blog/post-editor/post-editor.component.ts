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
  id: string = null;
  editorConfig: object = editorConfig;
  form: FormGroup;
  paramsSubscription;
  post: Post = new Post();
  postList;
  showEditorOptions: boolean = true;
  postStatus: string;

  constructor(
    private fb: FormBuilder,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group(this.post);
    this.postList = this.db.list('/posts');
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id) {
        this.postStatus = POST_STATUS.loading;
        const postSubscription = this.db
          .object(`/posts/${this.id}`)
          .subscribe(data => {
            this.post = new Post(data);
            postSubscription.unsubscribe();
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
    this.paramsSubscription.unsubscribe();
  }

  async prepareForSaving(newData) {
    this.postStatus = POST_STATUS.saving;
    this.post.updatePost(newData);

    if (!this.id) {
      const newPost = await this.postList.push(this.post);
      this.id = newPost.key;
      this.post.updatePost({ id: this.id });
    }

    this.savePost();
  }

  async savePost() {
    await this.postList.update(this.id, this.post);
    this.postStatus = POST_STATUS.saved;
  }

  toggleEditorOptions() {
    this.showEditorOptions = !this.showEditorOptions;
  }
}