import ipcRequest from '@/services/ipc-request/index';
import { Product } from '@/type';

export const getProducts = async ():Promise<Product[]> => await ipcRequest('/get/products');
export const getProduct = async (data:{ id: string }):Promise<Product> => await ipcRequest('/get/product', data);
export const addProduct = async (data:{ name: string }) => await ipcRequest('/post/product', data);
export const deleteProduct = async(data:{ id: string }) => await ipcRequest('/delete/product', data);
export const updateProduct = async(data: { id: string; name: string }) => await ipcRequest('/put/product', data);
export const updateProductDir = async(data: { id: string; dir: string }) => await ipcRequest('/patch/product/dir', data);