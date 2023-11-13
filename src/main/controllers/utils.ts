import { dialog, ipcMain } from 'electron';
import { IpcResponse } from '../services/ipc-response';

export default () => {
  ipcMain.handle('/utils/select-folder', async () => {
    const d = dialog.showOpenDialogSync({
      title: '文件夹选择',
      defaultPath: '',
      buttonLabel: '确认',
      properties: ['openDirectory', 'createDirectory']
    });
    const response = new IpcResponse();
    if (Array.isArray(d) && d.length === 1) {
      response.success(d[0]);
      return response;
    } else {
      response.error(1001, '选择文件夹异常');
      return response;
    }
  });
};