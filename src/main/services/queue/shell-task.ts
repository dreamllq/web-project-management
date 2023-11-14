import { v4 as uuidv4 } from 'uuid';
import { StdioOptions, spawn } from 'child_process';
import mainWindowService from '../main-window';

export class ShellTask {
  private _name: string = '';
  private _record: { id: string; data: string }[] = [];
  private _id: string = uuidv4();
  private _end: boolean = false;
  
  constructor(options:{ name: string }) {
    this._name = options.name;
  }

  get id() {
    return this._id;
  }

  exec(shell: string, args: string[] = [], options: { cwd: string; stdio?: StdioOptions }) {
    const d = {
      id: uuidv4(),
      data: `${shell} ${args.join(' ')}`
    };
    this._record.push(d);
    this.notify(d);

    const shellSpawn = spawn(shell, args, options);

    shellSpawn.stdout?.on('data', (data) => {
      console.log(`stdout: ${data}`);
      const d = {
        id: uuidv4(),
        data: data.toString()
      };
      this._record.push(d);
      this.notify(d);
    });

    shellSpawn.stderr?.on('data', (data) => {
      console.error(`stderr: ${data}`);
      const d = {
        id: uuidv4(),
        data: data.toString()
      };
      this._record.push(d);
      this.notify(d);
    });

    shellSpawn.on('message', (message) => {
      console.log('message', message);
    });

    shellSpawn.on('close', (code) => {
      this._end = true;
      console.log(`child process exited with code ${code}`);
      const d = {
        id: uuidv4(),
        data: `child process exited with code ${code}`
      };
      this._record.push(d);
      this.notify(d);
    });
  }

  notify(data: { id: string; data: string }) {
    mainWindowService.get()!.webContents.send('/notify/task/shell', {
      id: this._id,
      data: data,
      record: this._record,
      name: this._name,
      end: this._end
    });
  }

  toJSON() {
    return {
      id: this._id,
      record: this._record,
      name: this._name,
      end: this._end 
    };
  }
}