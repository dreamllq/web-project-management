import { Storage } from '../services/storage';
import { Project } from './project.type';
import { v4 as uuidv4 } from 'uuid';

let _instance: ProjectEntity | null = null;

export class ProjectEntity {
  private _projects: Project[] = [];
  private _storage: Storage;

  constructor() {
    this._storage = new Storage('base', 'project');  
    this._projects = [];
  }

  static getInstance(): ProjectEntity {
    if (_instance === null) {
      _instance = new ProjectEntity();
    }
    return _instance;
  }

  async init() {
    await this._storage.init();
    const data: Project[] = await this._storage.get();
    if (data) {
      this._projects = data;
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
    this._projects.push({
      id: uuidv4(),
      name: project.name,
      gitCloneUrl: project.gitCloneUrl,
      productId: project.productId
    });
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