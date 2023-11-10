export interface StorageAdapter {
  read: ()=>Promise<string | undefined>;
  write: (data: string)=>Promise<void>;
  clear: ()=>Promise<void>;
  init: ()=>Promise<void>;
}