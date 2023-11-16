export class Product {
  private _id: string = '';
  private _name: string = '';
  private _dir: string = '';

  constructor(options:{ id: string; name: string; dir?: string }) {
    this.id = options.id;
    this.name = options.name;
    this.dir = options.dir;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get dir() {
    return this._dir;
  }

  set id(val:string) {
    this._id = val || '';
  }

  set name(val:string) {
    this._name = val || '';
  }

  set dir(val:string | undefined) {
    this._dir = val || '';
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      dir: this.dir
    };
  }
}