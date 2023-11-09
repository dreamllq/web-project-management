import { ipcMain } from 'electron';

export default () => {
  ipcMain.handle('http1', async (event, data) => {
    console.log(data);
  });
};