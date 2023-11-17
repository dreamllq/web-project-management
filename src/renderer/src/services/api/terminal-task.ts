import ipcRequest from '@/services/ipc-request/index';

export const getTerminalTasks = async ():Promise<any> => await ipcRequest('/get/terminal-tasks');
export const killTerminalTask = async (data:{ id: string }):Promise<any> => await ipcRequest('/put/terminal-task/kill', data);
export const deleteTerminalTask = async (data:{ id: string }):Promise<any> => await ipcRequest('/delete/terminal-task', data);
