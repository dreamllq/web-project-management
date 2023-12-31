import { v4 as uuidv4 } from 'uuid';
import { ChildProcess, StdioOptions, spawn, exec } from 'child_process';
import mainWindowService from '../main-window';

export class ShellTask {
  private _name: string = '';
  private _record: { id: string; data: string }[] = [];
  private _id: string = uuidv4();
  private _end: boolean = true;
  private _meta: { projectId: string };
  private _shellSpawn?: ChildProcess = undefined;
  private _killed: boolean = false;
  
  constructor(options:{ name: string; meta: { projectId: string } }) {
    this._name = options.name;
    this._meta = options.meta;

    process.on('exit', () => {
      this._killed = true;
    });
  }
  get id() {
    return this._id;
  }

  exec(shell: string, args: string[] = [], options: { cwd: string; stdio?: StdioOptions }) {
    this._end = false;
    return new Promise((resolve, reject) => {
      const d = {
        id: uuidv4(),
        data: `${shell} ${args.join(' ')}\n`
      };
      this._record.push(d);
      this.notify(d);

      this._shellSpawn = spawn(shell, args, options);

      this._shellSpawn.stdout?.on('data', (data) => {
        console.log(`stdout: ${data}`);
        const d = {
          id: uuidv4(),
          data: data.toString()
        };
        this._record.push(d);
        this.notify(d);
      });

      this._shellSpawn.stderr?.on('data', (data) => {
        console.error(`stderr: ${data}`);
        const d = {
          id: uuidv4(),
          data: data.toString()
        };
        this._record.push(d);
        this.notify(d);
      });

      this._shellSpawn.on('message', (message) => {
        console.log('message', message);
      });

      
      if (process.platform === 'win32') {
        this._shellSpawn.on('exit', (code) => {
          this._end = true;
          console.log(`child process exited with code ${code}`);
          const d = {
            id: uuidv4(),
            data: `child process exited with code ${code}`
          };
          this._record.push(d);
          this.notify(d);
          if (code === 0) {
            resolve(code);
          } else (
            reject(code)
          );
        });
      } else {
        this._shellSpawn.on('close', (code) => {
          this._end = true;
          console.log(`child process exited with code ${code}`);
          const d = {
            id: uuidv4(),
            data: `child process exited with code ${code}`
          };
          this._record.push(d);
          this.notify(d);
          if (code === 0) {
            resolve(code);
          } else (
            reject(code)
          );
        });
      }
    });
  }

  kill() {
    return new Promise((resolve, reject) => {
      if (this._end) return resolve(null);
      if (process.platform === 'win32') {
        console.log(`taskkill /PID ${this._shellSpawn?.pid} /T /F`);
        this._killed = true;
        exec(`taskkill /PID ${this._shellSpawn?.pid} /T /F`, (error, stdout, stderr) => {
          console.log('taskkill stdout: ', stdout);
          console.log('taskkill stderr: ', stderr);
          
          if (error) {
            console.error(error);
            reject(error);
          } else {
            resolve(null);
          }
        });
      } else {
        this._shellSpawn?.kill();
        this._killed === true;
        resolve(null);
      }
    });

  }

  notify(data: { id: string; data: string }) {
    if (this._killed) return;
    mainWindowService.get()!.webContents.send('/notify/task/shell', {
      id: this._id,
      data: data,
      record: this._record,
      name: this._name,
      end: this._end,
      meta: this._meta
    });
  }

  toJSON() {
    return {
      id: this._id,
      record: this._record,
      name: this._name,
      end: this._end,
      meta: this._meta
    };
  }
}