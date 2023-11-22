import { ShellTask } from './shell-task';
import mainWindowService from '../main-window';

let _instance: Queue;

export class Queue {
  private _shellQueue: ShellTask[] = [];

  static getInstance(): Queue {
    if (!_instance) {
      _instance = new Queue();
    }
    return _instance;
  }

  get shellTasks() {
    return this._shellQueue;
  }
  
  generateShellTask(options:{ name: string; meta: { projectId: string } }): ShellTask {
    const task = new ShellTask(options);
    this._shellQueue.push(task);
    this.notify();
    return task;
  }

  remove(options:{ id: string }) {
    const index = this._shellQueue.findIndex(item => item.id === options.id);
    if (index > -1) {
      const task = this._shellQueue[index];
      task.kill();
      this._shellQueue.splice(index, 1);
      this.notify();
    }
  }

  notify() {
    mainWindowService.get()!.webContents.send('/notify/task/shells', {
      list: this._shellQueue.map(item => {
        const data = item.toJSON();
        return {
          id: data.id,
          name: data.name,
          meta: data.meta,
          end: data.end
        };
      })
    });
  }

  async kill() {
    await Promise.all(this._shellQueue.map(task => task.kill()));
  }
}