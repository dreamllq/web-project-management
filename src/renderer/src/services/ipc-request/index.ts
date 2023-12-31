import { ElMessage } from 'element-plus';

export default async (url: string, body?: Record<string, any>) => {
  const res:{
    status: number;
    code: number;
    data: any;
    msg: string;
  } = await window.electron.ipcRenderer.invoke(url, body);
  
  console.log('ipc', url, body, res);
  
  if (res.status === 0) {
    return res.data;
  } else {
    ElMessage.error(res.msg);
    const e = new Error(res.msg);
    // @ts-ignore
    e.code = res.status;
    throw e;
  }
};