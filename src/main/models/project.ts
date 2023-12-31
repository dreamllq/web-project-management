import { ProductEntity } from '../entities/product';
import fs from 'fs';
import path from 'path';

export class Project {
  private _id: string = '';
  private _name: string = '';
  private _gitCloneUrl: string = '';
  private _productId: string = '';

  constructor(options:{ id: string; name: string; gitCloneUrl: string; productId: string }) {
    this.id = options.id;
    this.name = options.name;
    this.gitCloneUrl = options.gitCloneUrl;
    this.productId = options.productId;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get gitCloneUrl() {
    return this._gitCloneUrl;
  }

  get productId() {
    return this._productId;
  }

  get folderName() {
    const urlArr = this.gitCloneUrl.split('/');
    const gitName = urlArr[urlArr.length - 1].replace(/(.*)\.+.*/g, '$1');
    return `${this.name}(${gitName})`;
  }

  set id(val: string) {
    this._id = val;
  }

  set name(val:string) {
    this._name = val;
  }

  set gitCloneUrl(val: string) {
    this._gitCloneUrl = val;
  }

  set productId(val: string) {
    this._productId = val;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      gitCloneUrl: this.gitCloneUrl,
      productId: this.productId
    };
  }

  async isGitCloned() {
    const folderPath = await this.getFolderPath();
    const hasCloned = fs.existsSync(folderPath);
    return hasCloned;
  }

  async getFolderPath() {
    const product = await ProductEntity.getInstance().getOne(this.productId);
    const folderPath = path.join(product!.dir!, this.folderName);
    return folderPath;
  }

  async getScripts() {
    const npmScripts = await this.getNpmScripts();
    return { npm: npmScripts };
  }

  async getNpmScripts() {
    const folderPath = await this.getFolderPath();
    const pkgPath = path.join(folderPath, 'package.json');
    if (!fs.existsSync(pkgPath)) {
      return [];
    }
    const content = fs.readFileSync(pkgPath);
    try {
      const pkg = JSON.parse(content.toString());
      const scripts = Object.keys(pkg.scripts).map(key => ({
        script: key,
        shell: pkg.scripts[key]
      }));

      scripts.unshift({
        script: 'install',
        shell: ''
      });

      return scripts;
    } catch (e) {
      return [];
    }
  }
}