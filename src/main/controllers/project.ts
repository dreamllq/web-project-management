import { ipcMain } from 'electron';
import { ProjectEntity } from '../entities/project';
import { IpcResponse } from '../services/ipc-response';
import { ProductEntity } from '../entities/product';
import { Queue } from '../services/queue';

export default () => {
  ipcMain.handle('/get/projects', async (_, data) => {
    const d = await ProjectEntity.getInstance().getAll({ productId: data.productId });
    const response = new IpcResponse();
    response.success(d);
    return response;
  });

  ipcMain.handle('/get/project', async (_, data) => {
    const d = await ProjectEntity.getInstance().getOne(data.id);
    const response = new IpcResponse();
    response.success(d);
    return response;
  });

  ipcMain.handle('/post/project', async (_, data) => {
    const d = await ProjectEntity.getInstance().add(data);
    const response = new IpcResponse();
    response.success(d);
    return response;
  });

  ipcMain.handle('/delete/project', async (_, data) => {
    const d = await ProjectEntity.getInstance().delete(data.id);
    const response = new IpcResponse();
    response.success(d);
    return response;
  });

  ipcMain.handle('/put/project', async (_, data) => {
    const d = await ProjectEntity.getInstance().update(data);
    const response = new IpcResponse();
    response.success(d);
    return response;
  });

  ipcMain.handle('/clone/project', async (_, data:{ id: string }) => {
    const project = await ProjectEntity.getInstance().getOne(data.id);
    const product = await ProductEntity.getInstance().getOne(project!.productId);

    const task = Queue.getInstance().generateShellTask({ name: `克隆：${project?.name}` });
    task.exec('git', ['clone', project!.gitCloneUrl], { cwd: product!.dir! });

    const response = new IpcResponse();
    response.success({ taskId: task.id });
    return response;
  });
};