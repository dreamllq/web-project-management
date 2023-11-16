export class IpcResponse {
  status: number = 0;
  data: any;
  msg: string = '';

  success(data?:any) {
    this.status = 0;
    this.data = data;
    this.msg = '操作成功';
  }

  error(status: number, msg: string) {
    this.data = null;
    this.status = status;
    this.msg = msg;
  }
}