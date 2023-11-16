import { ref } from 'vue';
import { createGlobalState } from '@vueuse/core';
import api from '@/services/api';

export type TaskNotify = {
  id: string; 
  record: { id: string; data: string }[]; 
  name: string;
  end: boolean;
  meta: { projectId: string };
};

export const useTaskTerminal = createGlobalState(() => {
  const taskOutMap = ref<Record<string, TaskNotify>>({});
  const selectedTaskId = ref<string>();

  const start = async () => {
    const res: { tasks: TaskNotify[] } = await api.terminalTask.getTerminalTasks();
    res.tasks.forEach(item => {
      taskOutMap.value[item.id] = item;
    });
    window.electron.ipcRenderer.on('/notify/task/shell', (_, arg:TaskNotify) => {
      console.log(arg);
      taskOutMap.value[arg.id] = arg;
    });
  };

  return {
    taskOutMap,
    start,
    selectedTaskId
  };
});