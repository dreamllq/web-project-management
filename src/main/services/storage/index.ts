import { safeStorage } from 'electron';
import { FileAdapter } from './file-adapter';
import { StorageAdapter } from './type';

export class Storage {
  private _adapter: StorageAdapter;
  private _isEncryptionAvailable: boolean = false;

  constructor(base:string, table:string, type = 'file') {
    this._isEncryptionAvailable = safeStorage.isEncryptionAvailable();
    if (type === 'file') {
      this._adapter = new FileAdapter(base, table);
    } else {
      throw new Error('not support');
    }
  }

  init() {
    return this._adapter.init();
  }

  async get() {
    let str = await this._adapter.read();

    if (str === undefined) return undefined;

    if (this._isEncryptionAvailable) {
      const buffer = Buffer.from(str, 'base64');
      str = safeStorage.decryptString(buffer);
    }

    try {
      return JSON.parse(str);
    } catch (e) {
      return undefined;
    }
  }

  async set(data:any) {
    let str = JSON.stringify(data);
    if (this._isEncryptionAvailable) {
      const buffer = safeStorage.encryptString(str);
      str = Buffer.from(buffer).toString('base64');
    }
    
    return await this._adapter.write(str);
  }

  async clear() {
    return await this._adapter.clear();
  }
}