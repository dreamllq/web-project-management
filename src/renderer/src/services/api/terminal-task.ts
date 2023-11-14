import ipcRequest from '@/services/ipc-request/index';

export const getTerminalTasks = async ():Promise<any> => await ipcRequest('/get/terminal-tasks');