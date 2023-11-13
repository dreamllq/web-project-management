import { dialog, ipcMain } from 'electron';
import { IpcResponse } from '../services/ipc-response';

export default () => {
  ipcMain.handle('/git/clone', async () => {
    
  });
};