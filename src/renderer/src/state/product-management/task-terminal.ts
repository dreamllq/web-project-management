import { ref, watchEffect } from 'vue';
import { createGlobalState } from '@vueuse/core';
import api from '@/services/api';

export type TaskNotify = {
  id: string; 
  record: { id: string; data: string }[]; 
  name: string;
  end: boolean;
  meta: { projectId: string };
};

export type TasksNotify = {
  id: string; 
  name: string;
  end: boolean;
  meta: { projectId: string };
};

export const useTaskTerminal = createGlobalState(() => {
  const taskOutMap = ref<Record<string, TaskNotify>>({});
  const taskShells = ref<TasksNotify[]>([]);
  const selectedTaskId = ref<string | null>(null);

  watchEffect(() => {
    if (selectedTaskId.value === null && taskShells.value.length > 0) {
      selectedTaskId.value = taskShells.value[0].id;
    } else if (taskShells.value.length > 0 && taskShells.value.find(item => item.id === selectedTaskId.value) === undefined) {
      selectedTaskId.value = taskShells.value[0].id;
    } else if (taskShells.value.length === 0) {
      selectedTaskId.value = null;
    }
  });

  const start = async () => {
    const res: { tasks: TaskNotify[] } = await api.terminalTask.getTerminalTasks();
    res.tasks.forEach(item => {
      taskOutMap.value[item.id] = item;
    });

    taskShells.value = res.tasks.map(item => ({
      id: item.id,
      name: item.name,
      end: item.end,
      meta: item.meta
    }));

    window.electron.ipcRenderer.on('/notify/task/shell', (_, arg:TaskNotify) => {
      console.log(arg);
      taskOutMap.value[arg.id] = arg;
    });

    window.electron.ipcRenderer.on('/notify/task/shells', (_, arg:{ list: TasksNotify[] }) => {
      taskShells.value = arg.list;
    });
  };

  return {
    taskOutMap,
    taskShells,
    start,
    selectedTaskId
  };
});