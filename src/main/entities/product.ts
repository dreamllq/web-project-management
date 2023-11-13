import { Storage } from '../services/storage';
import { Product } from './product.type';
import { v4 as uuidv4 } from 'uuid';

let _instance: ProductEntity | null = null;

export class ProductEntity {
  private _products: Product[] = [];
  private _storage: Storage;

  constructor() {
    this._storage = new Storage('base', 'product');  
    this._products = [];
  }

  static getInstance(): ProductEntity {
    if (_instance === null) {
      _instance = new ProductEntity();
    }
    return _instance;
  }

  async init() {
    await this._storage.init();
    const data: Product[] = await this._storage.get();
    if (data) {
      this._products = data;
    }
  }

  async getAll() {
    return this._products;
  }

  async getOne(id: string): Promise<Product | undefined> {
    const index = this._products.findIndex(item => item.id === id);
    if (index > -1) {
      return this._products[index];
    } else {
      return undefined;
    }
  }

  async add(product: { name: string }) {
    this._products.push({
      id: uuidv4(),
      name: product.name
    });
    await this._storage.set(this._products);
  }

  async delete(id:string) {
    const index = this._products.findIndex(item => item.id === id);
    if (index > -1) {
      this._products.splice(index, 1);
      await this._storage.set(this._products);
    }
  }

  async update(product: { id: string; name: string }) {
    const index = this._products.findIndex(item => item.id === product.id);
    if (index > -1) {
      this._products[index].name = product.name;
      await this._storage.set(this._products);
    }
  }

  async updateDir(product:{ id: string; dir: string }) {
    const index = this._products.findIndex(item => item.id === product.id);
    if (index > -1) {
      this._products[index].dir = product.dir;
      await this._storage.set(this._products);
    }
  }
}