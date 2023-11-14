import ipcRequest from '@/services/ipc-request/index';

export const clone = async (data: { projectId: string }):Promise<any> => await ipcRequest('/git/clone', data);