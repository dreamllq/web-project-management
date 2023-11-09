export default async (url: string, body?: Record<string, any>) => {
  const res:{
    status: number;
    code: number;
    data: any;
    msg: string;
  } = await window.electron.ipcRenderer.invoke(url, body);

  if (res.status === 0) {
    return res.data;
  } else {
    const e = new Error(res.msg);
    e.code = res.status;
    throw e;
  }
};