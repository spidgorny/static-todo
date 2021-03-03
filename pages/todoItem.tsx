export class TodoItem {
  public title: string;
  public status: string;
  public done: boolean;
  public tags: string[];

  constructor(title: string, options: object) {
    this.title = title;
    Object.assign(this, options);
  }
}
