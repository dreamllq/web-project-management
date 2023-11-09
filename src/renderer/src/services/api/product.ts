import ipcRequest from '@/services/ipc-request/index';

export const getProducts = async () => await ipcRequest('/get/products');
export const addProduct = async (data) => await ipcRequest('/post/product', data);
export const deleteProduct = async(data) => await ipcRequest('/delete/product', data);
export const editProduct = async(data) => await ipcRequest('/put/product', data);