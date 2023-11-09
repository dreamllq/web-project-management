import { Product } from './product.type';
import path from 'path';

let _instance: ProductEntity | null = null;

export class ProductEntity {
  products: Product[] = [];

  constructor() {}

  static getInstance(): ProductEntity {
    if (_instance === null) {
      _instance = new ProductEntity();
    }
    return _instance;
  }

  async init() {
    console.log(111, path.resolve());
    
  }
}