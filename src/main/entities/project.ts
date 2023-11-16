import { Storage } from '../services/storage';
import { Project } from '../models/project';
import { v4 as uuidv4 } from 'uuid';

let _instance: ProjectEntity | null = null;
const _flag = Symbol();

export class ProjectEntity {
  private _projects: Project[] = [];
  private _storage: Storage;

  constructor(flag: typeof _flag) {
    if (flag !== _flag) throw new Error('请使用 getInstance 获取实例');
    this._storage = new Storage('base', 'project');  
    this._projects = [];
  }

  static getInstance(): ProjectEntity {
    if (_instance === null) {
      _instance = new ProjectEntity(_flag);
    }
    return _instance;
  }

  async init() {
    await this._storage.init();
    const data: any[] = await this._storage.get();
    if (data) {
      this._projects = data.map(item => new Project(item));
    }
  }

  async getAll(data:{ productId: string }) {
    return this._projects.filter(project => project.productId === data.productId);
  }

  async getOne(id: string) {
    const index = this._projects.findIndex(item => item.id === id);
    if (index > -1) {
      return this._projects[index];
    } else {
      return undefined;
    }
  }

  async add(project: { name: string; gitCloneUrl: string; productId: string }) {
    this._projects.push(new Project({
      id: uuidv4(),
      name: project.name,
      gitCloneUrl: project.gitCloneUrl,
      productId: project.productId
    }));
    await this._storage.set(this._projects);
  }

  async delete(id:string) {
    const index = this._projects.findIndex(item => item.id === id);
    if (index > -1) {
      this._projects.splice(index, 1);
      await this._storage.set(this._projects);
    }
  }

  async update(product: Project) {
    const index = this._projects.findIndex(item => item.id === product.id);
    if (index > -1) {
      this._projects[index].name = product.name;
      this._projects[index].gitCloneUrl = product.gitCloneUrl;
      this._projects[index].productId = product.productId;
      await this._storage.set(this._projects);
    }
  }
}