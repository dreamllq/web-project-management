import { ipcMain } from 'electron';
import { IpcResponse } from '../services/ipc-response';
import { Queue } from '../services/queue';

export default () => {
  ipcMain.handle('/get/terminal-tasks', async () => {
    const response = new IpcResponse();
    response.success({ tasks: Queue.getInstance().shellTasks });
    return response;
  });
};