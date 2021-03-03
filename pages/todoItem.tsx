const shortid = require("shortid");

export class TodoItem {
  public id: string;
  public title: string;
  public status: string;
  public done: boolean;
  public tags: string[];

  constructor(title: string, options: object) {
    this.title = title;
    Object.assign(this, options);
    if (!this.id) {
      this.id = shortid.generate();
    }
  }
}
