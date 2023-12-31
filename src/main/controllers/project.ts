import { ipcMain, shell } from 'electron';
import { ProjectEntity } from '../entities/project';
import { IpcResponse } from '../services/ipc-response';
import { ProductEntity } from '../entities/product';
import { Queue } from '../services/queue';
import { exec } from 'child_process';
import fs from 'fs';

export default () => {
  ipcMain.handle('/get/projects', async (_, data) => {
    const d = await ProjectEntity.getInstance().getAll({ productId: data.productId });

    const projects = await Promise.all(d.map(async project => {
      const hasCloned = await project.isGitCloned();
      return {
        ...project.toJSON(),
        hasCloned
      };
    }));

    const response = new IpcResponse();
    response.success(projects);
    return response;
  });

  ipcMain.handle('/get/project', async (_, data) => {
    const d = await ProjectEntity.getInstance().getOne(data.id);
    const response = new IpcResponse();
    response.success(d?.toJSON());
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
    const hasCloned = await project!.isGitCloned();

    if (hasCloned !== true) {
      const task = Queue.getInstance().generateShellTask({
        name: `克隆：${project?.name}`,
        meta: { projectId: project!.id } 
      });
      task.exec('git', [
        'clone',
        project!.gitCloneUrl,
        project!.folderName
      ], { cwd: product!.dir! });

      const response = new IpcResponse();
      response.success({ taskId: task.id });
      return response;
    } else {
      const response = new IpcResponse();
      response.error(1101, '项目已克隆');
      return response;
    }
  });

  ipcMain.handle('/open-folder/project', async (_, data:{ id: string }) => {
    const project = await ProjectEntity.getInstance().getOne(data.id);
    const folderPath = await project!.getFolderPath();
    const hasCloned = await project!.isGitCloned();

    if (hasCloned) {
      shell.openPath(folderPath);
      const response = new IpcResponse();
      response.success();
      return response;
    } else {
      const response = new IpcResponse();
      response.error(1102, '项目未克隆');
      return response;
    }
  });

  ipcMain.handle('/open-vscode/project', async (_, data:{ id: string }) => {
    const project = await ProjectEntity.getInstance().getOne(data.id);
    const product = await ProductEntity.getInstance().getOne(project!.productId);
  
    const folderPath = `${product!.dir!}/${project!.folderName}`;
    const hasCloned = fs.existsSync(folderPath);

    if (hasCloned) {
      exec('code .', { cwd: folderPath });
      const response = new IpcResponse();
      response.success();
      return response;
    } else {
      const response = new IpcResponse();
      response.error(1102, '项目未克隆');
      return response;
    }
  });

  ipcMain.handle('/get/project/scripts', async(_, data:{ id: string }) => {
    const project = await ProjectEntity.getInstance().getOne(data.id);
    const scripts = await project!.getScripts();
    const response = new IpcResponse();
    response.success(scripts);
    return response;
  });

  ipcMain.handle('/post/project/script', async(_, data: { id: string; script: {
    script: string;
    shell: any;
    type: 'npm';
  }; }) => {
    const project = await ProjectEntity.getInstance().getOne(data.id);
    const folderPath = await project!.getFolderPath();
    
    const task = Queue.getInstance().generateShellTask({
      name: `【${project?.name}】${data.script.script}-${data.script.type}`,
      meta: { projectId: project!.id } 
    });

    if (data.script.type === 'npm') {
      const npmScripts = ['install'];
      task.exec(process.platform === 'win32' ? 'npm.cmd' : 'npm', npmScripts.includes(data.script.script) ? [data.script.script] : ['run', data.script.script], { cwd: folderPath });
    }

    const response = new IpcResponse();
    response.success({ taskId: task.id });
    return response;
  });
};