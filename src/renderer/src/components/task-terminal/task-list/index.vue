<template>
  <div v-if='taskList.length>0' class='task-list-inner'>
    <template v-for='task in taskShells' :key='task.id'>
      <div class='task-item-wrapper' @click='onSelectTask(task)'>
        <task-item :id='task.id' :name='task.name' />
      </div>
    </template>
  </div>
  <div v-else style='height: 100%;'>
    <el-empty description='无执行任务' style='height: 100%;' />
  </div>
</template>

<script setup lang="ts">
import { TasksNotify, useTaskTerminal } from '@/state/product-management/task-terminal';
import { computed } from 'vue';
import TaskItem from './task-item.vue';

const { taskOutMap, selectedTaskId, taskShells } = useTaskTerminal();

const taskList = computed(() => Object.keys(taskOutMap.value).map(id => taskOutMap.value[id]));

const onSelectTask = (task:TasksNotify) => {
  selectedTaskId.value = task.id;
};
</script>

<style scoped>

</style>