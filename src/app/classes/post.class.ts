const DEFAULT_POST = {
  id: null,
  title: new Date().toDateString(),
  body: '',
  creationDate: new Date(),
  modifyDate: new Date(),
  isPublic: false,
};

export const POST_STATUS = {
  new: '',
  loading: 'Loading...',
  saving: 'Saving post...',
  saved: 'Saved',
};

export class Post {
  id: string;
  title: string;
  body: string;

  creationDate: Date;
  modifyDate: Date;

  isPublic: boolean;

  constructor(data: object = {}) {
    this.updatePost({
      ...DEFAULT_POST,
      ...data,
    });
  }

  updatePost(newData: object) {
    Object.keys(newData).forEach(key => (this[key] = newData[key]));
  }

  getEditableFields() {
    const { title, body, creationDate, isPublic } = this;
    return {
      title,
      body,
      creationDate,
      isPublic,
    };
  }
}
