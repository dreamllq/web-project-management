import { ipcMain } from 'electron';
import { IpcResponse } from '../services/ipc-response';
import { Queue } from '../services/queue';
import { ProjectEntity } from '../entities/project';
import { ProductEntity } from '../entities/product';

export default () => {
  ipcMain.handle('/git/clone', async (_, data:{ projectId: string }) => {
    const project = await ProjectEntity.getInstance().getOne(data.projectId);
    const product = await ProductEntity.getInstance().getOne(project!.productId);
    const shell = `cd ${product?.dir} && git clone ${project!.gitCloneUrl}`;

    const task = Queue.getInstance().generateShellTask(shell, { name: `克隆：${project?.name}` });
    task.exec();

    const response = new IpcResponse();
    response.success({ taskId: task.id });
    return response;
  });
};