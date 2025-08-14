import { Component, EventEmitter, Output } from '@angular/core';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
  standalone: false,
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter<Post>();

  onAppPost() {
    const post: Post = {
      title: this.enteredTitle,
      content: this.enteredContent,
    };

    this.postCreated.emit(post);
  }
}
