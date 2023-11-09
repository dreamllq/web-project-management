import { FileAdapter } from './file-adapter';
import { StorageAdapter } from './type';

export class Storage {
  adapter: StorageAdapter;

  constructor(base:string, table:string, type = 'file') {
    if (type === 'file') {
      this.adapter = new FileAdapter(base, table);
    } else {
      throw new Error('not support');
    }
  }

  async get() {
    return await this.adapter.read();
  }

  async set(data:string) {
    return await this.adapter.write(data);
  }

  async clear() {
    return await this.adapter.clear();
  }
}