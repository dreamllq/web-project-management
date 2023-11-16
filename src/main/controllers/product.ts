import { ipcMain } from 'electron';
import { ProductEntity } from '../entities/product';
import { IpcResponse } from '../services/ipc-response';

export default () => {
  ipcMain.handle('/get/products', async () => {
    const d = await ProductEntity.getInstance().getAll();
    const response = new IpcResponse();
    response.success(d.map(item => item.toJSON()));
    return response;
  });

  ipcMain.handle('/get/product', async (_, data) => {
    const d = await ProductEntity.getInstance().getOne(data.id);
    const response = new IpcResponse();
    response.success(d?.toJSON());
    return response;
  });

  ipcMain.handle('/post/product', async (_, data) => {
    const d = await ProductEntity.getInstance().add(data);
    const response = new IpcResponse();
    response.success(d);
    return response;
  });

  ipcMain.handle('/delete/product', async (_, data) => {
    const d = await ProductEntity.getInstance().delete(data.id);
    const response = new IpcResponse();
    response.success(d);
    return response;
  });

  ipcMain.handle('/put/product', async (_, data) => {
    const d = await ProductEntity.getInstance().update(data);
    const response = new IpcResponse();
    response.success(d);
    return response;
  });

  ipcMain.handle('/patch/product/dir', async (_, data) => {
    const d = await ProductEntity.getInstance().updateDir(data);
    const response = new IpcResponse();
    response.success(d);
    return response;
  });
};