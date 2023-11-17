import { ipcMain } from 'electron';
import { IpcResponse } from '../services/ipc-response';
import { Queue } from '../services/queue';

export default () => {
  ipcMain.handle('/get/terminal-tasks', async () => {
    const response = new IpcResponse();
    response.success({ tasks: Queue.getInstance().shellTasks.map(task => task.toJSON()) });
    return response;
  });

  ipcMain.handle('/put/terminal-task/kill', async (_, data:{ id: string }) => {
    const tasks = Queue.getInstance().shellTasks;
    const task = tasks.find(item => item.id === data.id);
    task!.kill();

    const response = new IpcResponse();
    response.success();
    return response;
  });

  ipcMain.handle('/delete/terminal-task', async (_, data:{ id: string }) => {
    Queue.getInstance().remove({ id: data.id });

    const response = new IpcResponse();
    response.success();
    return response;
  });
};