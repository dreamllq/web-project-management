import { ShellTask } from './shell-task';

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
    return this._shellQueue.map(task => task.toJSON());
  }
  
  generateShellTask(options:{ name: string; meta: { projectId: string } }): ShellTask {
    const task = new ShellTask(options);
    this._shellQueue.push(task);
    return task;
  }
}