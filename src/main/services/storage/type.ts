export interface StorageAdapter {
  read: ()=>Promise<string>;
  write: (data: string)=>Promise<void>;
  clear: ()=>Promise<void>;
}