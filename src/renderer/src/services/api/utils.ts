import ipcRequest from '@/services/ipc-request/index';

export const selectFolder = async ():Promise<any> => await ipcRequest('/utils/select-folder');