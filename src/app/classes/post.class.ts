const DEFAULT_POST = {
  id: null,
  title: new Date().toDateString(),
  body: '',
  creationDate: Date.now(),
  modifyDate: Date.now(),
  location: '',
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
  location: string;
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
    const { title, body, creationDate, location, isPublic } = this;
    return {
      title,
      body,
      creationDate,
      location,
      isPublic,
    };
  }
}
