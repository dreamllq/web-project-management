<template>
  <div class='task-list-inner'>
    <template v-for='task in taskList' :key='task.id'>
      <div class='task-item-wrapper' @click='onSelectTask(task)'>
        <task-item :id='task.id' :name='task.name' />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useTaskTerminal } from '@/state/product-management/task-terminal';
import { computed } from 'vue';
import TaskItem from './task-item.vue';
import { TaskNotify } from '@/state/product-management/task-terminal';
const { taskOutMap, selectedTaskId } = useTaskTerminal();

const taskList = computed(() => Object.keys(taskOutMap.value).map(id => taskOutMap.value[id]));

const onSelectTask = (task:TaskNotify) => {
  selectedTaskId.value = task.id;
};
</script>

<style scoped>

</style>