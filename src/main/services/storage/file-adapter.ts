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
  }

  async init() {
    if (!fs.existsSync(this.dirPath)) {
      fs.mkdirSync(this.dirPath, { recursive: true });
    }
  }

  async read() {
    if (fs.existsSync(this.filePath)) {
      return fs.readFileSync(this.filePath, 'utf-8');
    } else {
      return undefined;
    }
  }

  async write(data: string) {
    fs.writeFileSync(this.filePath, data, { encoding: 'utf-8' });
  }

  async clear() {
    fs.rmSync(this.filePath);
  };
}