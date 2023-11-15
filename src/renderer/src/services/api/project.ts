import ipcRequest from '@/services/ipc-request/index';
import { Project } from '@/type';

export const getProjects = async (data: { productId: string }):Promise<Project[]> => await ipcRequest('/get/projects', data);
export const getProject = async (data: { id: string }):Promise<Project> => await ipcRequest('/get/project', data);
export const addProject = async (data: { name: string; productId: string; gitCloneUrl: string }) => await ipcRequest('/post/project', data);
export const deleteProject = async (data: { id: string }) => await ipcRequest('/delete/project', data);
export const updateProject = async (data: { id: string; name: string; gitCloneUrl: string; productId: string }) => await ipcRequest('/put/project', data);
export const cloneProject = async (data: { id: string }):Promise<any> => await ipcRequest('/clone/project', data);
export const openFolderProject = async (data: { id: string }):Promise<any> => await ipcRequest('/open-folder/project', data);
export const openVscodeProject = async (data: { id: string }):Promise<any> => await ipcRequest('/open-vscode/project', data);


