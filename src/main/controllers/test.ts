import { ipcMain } from 'electron';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default () => {
  ipcMain.handle('ping', () => 'pong');
  ipcMain.handle('http', async (_, ...args) => {
    await delay(1000);
    return args;
  });
};