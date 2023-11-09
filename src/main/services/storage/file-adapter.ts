import { StorageAdapter } from './type';
import path from 'path';
import fs from 'fs';

export class FileAdapter implements StorageAdapter {
  base: string;
  table: string;

  dirPath: string;
  filePath: string;

  constructor(base: string, table: string) {
    this.base = base;
    this.table = table;

    this.dirPath = path.resolve('storage', this.base);
    this.filePath = path.resolve('storage', this.base, this.table);

    if (!fs.existsSync(this.dirPath)) {
      fs.mkdirSync(this.dirPath, { recursive: true });
    }
  }

  async read() {
    
  }

  async write(data: string) {

  }

  async clear() {

  };
}